var app = angular.module('whatiate');

app.service('Foursquare', function($http, foursquareApi, UtilService) {
  function whatsAt(long, lat) {
    var keyValObject = {
      '[LONG]': long,
      '[LAT]': lat,
      '[CLIENT_ID]': foursquareApi.credentials.clientId,
      '[CLIENT_SECRET]': foursquareApi.credentials.clientSecret
    };
    var url = UtilService.createURLstring(foursquareApi.url, keyValObject);
    return $http.get(url);
  }
  return {
    whatsAt: whatsAt
  };
})

.service('Geocode', function($http, googleGeocodeApi, UtilService) {
  function lookup(long, lat) {
    var keyValObject = {
      '[LONG]': long,
      '[LAT]': lat,
      '[KEY]': googleGeocodeApi.credentials.key
    };
    var url = UtilService.createURLstring(googleGeocodeApi.url, keyValObject);
    return $http.get(url);
  }
  return {
    lookup: lookup
  };
})

.service('LocationService', function($log, $q, Foursquare, Geocode, UtilService) {

  var self = this;

  self.getGPSinfo = function(fileEntry) {
    var deferred = $q.defer();
    fileEntry.file(function(file) {
      EXIF.getData(file, function() {
        var long = EXIF.getTag(this, "GPSLongitude");
        var lat = EXIF.getTag(this, "GPSLatitude");
        if (long && lat) {
          long = UtilService.convertDegToDec(long);
          lat = UtilService.convertDegToDec(lat);
          if (EXIF.getTag(this, "GPSLongitudeRef") === "W") {
            long = -1 * long;
          }
          if (EXIF.getTag(this, "GPSLatitudeRef") === "S") {
            lat = -1 * lat;
          }
          deferred.resolve(self.locateAddress(long, lat));
        } else {
          deferred.resolve(null);
        }
      });
    });
    return deferred.promise;
  };

  self.locateAddress = function(long, lat) {
    var deferred = $q.defer();
    self.getInfo(long, lat)
      .then(function(result) {
        $log.info('Result was ' + JSON.stringify(result));
        var computedAddress = {
          coordinates: { long: long, lat: lat }
        };
        if (result.type === 'foursquare') {
          computedAddress.foursquare = result.name + ' located at ' + result.address;
        } else if (result.type === 'geocode') {
          computedAddress.geocode = result.address;
        } else {
          computedAddress.map = result.map;
        }
        deferred.resolve(computedAddress);
      });
    return deferred.promise;
  };

  self.getInfo = function(long, lat) {
    var deferred = $q.defer();

    Foursquare.whatsAt(long, lat)
      .then(function(fq_responce) {
        $log.info('Foursquare result: ' + JSON.stringify(fq_responce));

        if (fq_responce.status === 200 && fq_responce.data.response.venues.length >= 1) {
          var bestMatch = fq_responce.data.response.venues[0];
          var result = {
            type: "foursquare",
            name: bestMatch.name,
            address: bestMatch.location.formattedAddress.join(", ")
          };
          deferred.resolve(result);
        } else {

          Geocode.lookup(long, lat)
            .then(function(geo_responce) {
              $log.info('Geocode result: ' + JSON.stringify(geo_responce));

              if (geo_responce.data && geo_responce.data.results && geo_responce.data.results.length >= 1) {
                var bestMatch = geo_responce.data.results[0];
                var result = {
                  type: "geocode",
                  address: bestMatch.formatted_address
                };
                deferred.resolve(result);
              } else {
                var keyValObject = { '[LONG]': long, '[LAT]': lat };
                var url = UtilService.createURLstring(googleMapsApi.url, keyValObject);
                $log.info('Map result: ' + url);
                var result = {
                  type: "map",
                  map: url
                };
                deferred.resolve(result);
              }
            });
        }
      });
    return deferred.promise;
  };

  return self;
});
