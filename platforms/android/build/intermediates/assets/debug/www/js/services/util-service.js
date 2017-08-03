var app = angular.module('whatiate');

app.service("UtilService", function($cordovaBarcodeScanner, $cordovaCamera, $log,
  $q, $window, AuthService, AwsService) {
  var self = this;

  self.createURLstring = function(URLstring, keyValObject) {
    // for (var key in keyValObject) {
    //   URLstring = _.replace(URLstring, key, keyValObject[key]);
    // }
    // return URLstring;
    for (var key in keyValObject) {
      URLstring = URLstring.replace(new RegExp(_.escapeRegExp(key), 'g'), keyValObject[key]);
    }
    $log.info('URLstring', URLstring);
    return URLstring;
  };

  self.convertDegToDec = function(arr) {
    return (arr[0].numerator + arr[1].numerator / 60 + (arr[2].numerator / arr[2].denominator) / 3600).toFixed(4);
  };

  self.getFileRef = function(fileURI) {
    var deferred = $q.defer();
    window.resolveLocalFileSystemURL(fileURI, function(fileEntry) {
      deferred.resolve(fileEntry);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  self.uploadFileToAWS = function(filepath,type,uid) {
    // var deferred = $q.defer();
    // fileEntry.file(function(file) {
    //   var reader = new FileReader();
    //   reader.onloadend = function(e) {
    //     var blob = new Blob([this.result], { type: 'image/jpeg' });
    //     var timestamp = new Date().getTime();
    //     var params = {
    //       Key: AuthService.user.uid + '|' + timestamp + '.jpg',
    //       ContentType: 'image/jpeg',
    //       Body: blob
    //     };
    //     AwsService.bucket.upload(params, function(err, data) {
    //       if (!err) {
    //         console.log('data.Location', data.Location);
    //         deferred.resolve(data.Location);
    //       } else {
    //         deferred.reject(err);
    //       }
    //     });
    //   };
    //   reader.readAsArrayBuffer(file);
    //   // deferred.resolve('https://s3-eu-west-1.amazonaws.com/mobile.artmyweb.com/facebook%3A10208720852562231%7C1457548618955.jpg');
    // });
    // return deferred.promise;

// =====================================================
  var deferred = $q.defer();

  var file = filepath
   
   var timestamp = new Date().getTime();

   
      var childpath = 'Blog/'+ uid +'|'+ timestamp + '.jpg'
      var imgname = uid +'|'+ timestamp + '.jpg'
   


    var storageRef = firebase.storage().ref();

    var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, imgname));
        });
    };

    getFileObject(file, function(fileObject) {
        var uploadTask = storageRef.child(childpath).put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
            console.log(snapshot);
        }, function(error) {
            console.log(error);
            deferred.reject(error);
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            deferred.resolve(downloadURL);
           // localStorage.setItem('userProfileImage',downloadURL)
            // handle image here
        });
    });

    return deferred.promise;
// =====================================================
    





  };

  self.getPicture = function(source) {
    var deferred = $q.defer();

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.NATIVE_URI,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions
    };

    if (source === 'camera') {
      options.sourceType = Camera.PictureSourceType.CAMERA;
      options.saveToPhotoAlbum = false;
      options.targetWidth = 800;
      options.targetHeight = 800;
    } else {
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    }

    $cordovaCamera.getPicture(options)
      .then(function(imageData) {
        deferred.resolve(imageData);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  self.readBarCode = function() {
    var deferred = $q.defer();
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        deferred.resolve(barcodeData);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  return self;
});
