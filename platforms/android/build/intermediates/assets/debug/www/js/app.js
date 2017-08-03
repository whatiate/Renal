// Ionic WhatIAte App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('whatiate', ['ionic', 'firebase', 'ngMessages', 'ngCordova', 'angularMoment','chart.js','ionic.cloud']);

//    var config = {
//     apiKey: "AIzaSyDcqqhdegSUlaD2nXA6qpOcGVYyX89KddU",
//     authDomain: "whatiate-d5b2f.firebaseapp.com",
//     databaseURL: "https://whatiate-d5b2f.firebaseio.com",
//     projectId: "whatiate-d5b2f",
//     storageBucket: "whatiate-d5b2f.appspot.com",
//     messagingSenderId: "625805256500"
//   };
//   firebase.initializeApp(config);
// var rootRef = firebase.database().ref();


// app.constant('firebaseUrl', config.databaseURL);
// app.constant('firebaseUrl', 'https://mealtrackerapp.firebaseio.com');
app.constant('firebaseUrl', 'https://whatiate-d5b2f.firebaseio.com');
app.constant('nutritionixApi', {
  credentials: {
    appId: '3af8253e',
    appKey: '1903a64eb11fe04c7f9679e36f565d40'
  },
  barcode: {
    url: 'https://api.nutritionix.com/v1_1/item?upc=[BARCODE]&appId=[APPID]&appKey=[APPKEY]'
  },
  text: {
    url: 'https://api.nutritionix.com/v1_1/search/[TEXT]?results=0:50&fields=[FIELDS]&appId=[APPID]&appKey=[APPKEY]',
    fields: ['brand_name', 'item_name', 'brand_id', 'item_id', 'upc', 'item_type', 'item_description', 'nf_ingredient_statement', 'nf_water_grams', 'nf_calories', 'nf_calories_from_fat', 'nf_total_fat', 'nf_saturated_fat', 'nf_monounsaturated_fat', 'nf_polyunsaturated_fat', 'nf_trans_fatty_acid', 'nf_cholesterol', 'nf_sodium', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein', 'nf_vitamin_a_iu', 'nf_vitamin_a_dv', 'nf_vitamin_c_mg', 'nf_vitamin_c_dv', 'nf_calcium_mg', 'nf_calcium_dv', 'nf_iron_mg', 'nf_iron_dv', 'nf_potassium', 'nf_refuse_pct', 'nf_servings_per_container', 'nf_serving_size_qty', 'nf_serving_size_unit', 'nf_serving_weight_grams', 'allergen_contains_milk', 'allergen_contains_eggs', 'allergen_contains_fish', 'allergen_contains_shellfish', 'allergen_contains_tree_nuts', 'allergen_contains_peanuts', 'allergen_contains_wheat', 'allergen_contains_soybeans', 'allergen_contains_gluten', 'images_front_full_url', 'updated_at', 'section_ids']
  }
});
app.constant('foursquareApi', {
  credentials: {
    clientId: 'C2PL1JPLJ2DRK0QLS0KO2YTPO03WPJYUAFGFU130NHKUA0LR',
    clientSecret: '0RMHNDKU1SPXRTHINIHSS21WOGUFV1XUUE0ASDSLZVF5K2NF'
  },
  url: 'https://api.foursquare.com/v2/venues/search?ll=[LAT],[LONG]&intent=browse&radius=30&client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&v=20151201'
});
app.constant('googleGeocodeApi', {
  credentials: {
    key: 'AIzaSyDSaXskKK3-P6CLprX-fjYj5iB6SKoVp3A'
  },
  url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=[LAT],[LONG]&key=[KEY]'
});
app.constant('googleMapsApi', {
  url: 'https://maps.googleapis.com/maps/api/staticmap?center=[LAT],[LONG]zoom=13&size=300x300&maptype=roadmap&markers=color:blue%7Clabel:X%7C[LAT],[LONG]'
});
app.constant('chunkSize', 3);
app.constant('AwsConfig', {
  AKID: 'AKIAIAI5XFEL5Q4DEHNQ',
  SAK: 'zw30Ko6DKTJyxh5XrTfvB+osZS3hPpJcmCiz1pKk',
  BUCKET: 'mobile.artmyweb.com',
  REGION: 'eu-west-1'
});

app.run(function($ionicLoading, $ionicPlatform, $ionicPopup, $log, $rootScope, $state, $timeout, AuthService) {
  $ionicPlatform.ready(function() {
    if (window.Connection) {
      var onOffline = function() {
        $ionicPopup.alert({
            title: 'No Internet Connection',
            content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
          })
          .then(function(result) {
            ionic.Platform.exitApp();
          });
        $rootScope.offline = true;
      };
      var onOnline = function() {
        $rootScope.offline = false;
      };
      if (navigator.connection.type == Connection.NONE) {
        onOffline();
      }
      $rootScope.$on('$cordovaNetwork:offline', onOffline);
      $rootScope.$on('$cordovaNetwork:online', onOnline);
    }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (navigator.splashscreen) {
      $timeout(function() {
        navigator.splashscreen.hide();
      }, 1000);
    }
  });

  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
  //   var user = AuthService.user;
  //   if (toState.authenticate && !user) {
  //     event.preventDefault();

  //     var tempState  = localStorage.getItem("trackeruserState");
  //     if(tempState == "true"){
  //         $state.go('menu.overview');
  //     }else{
  //        $state.go('login');
  //     }
  //     return;
  //   }
  // });
});

// some exception handling
// app.config(function($provide) {
//   $provide.decorator('$exceptionHandler', ['$delegate', '$window', '$log', function($delegate, $window, $log) {
//     return function(exception, cause) {
//       console.error('$exceptionHandler ', exception);
//       console.error('$exceptionHandler stack', exception.stack);
//     };
//   }]);
// });

// app states configuration
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('login', {
      url: "/login",
      cache: false,
      controller: 'LoginCtrl',
      templateUrl: "templates/login.html"
    })
    .state('create-account', {
      url: "/create-account",
      controller: 'CreateAccountCtrl',
      templateUrl: "templates/create-account.html"
    })
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "templates/menu.html"
    })


    .state('menu.personalinfo', {
      url: '/personalinfo',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu/personalinfo/personalinfo.html',
          controller: 'personalinfoCtrl'
        }
      },
      authenticate: true
    })
    .state('pointsresults', {
      url: '/pointsresults',
      // views: {
      //   'menuContent': {
          templateUrl: 'templates/menu/pointsresults/pointsresults.html',
          controller: 'pointsresultsCtrl',
      //   }
      // },
      authenticate: true
    })
    .state('menu.daily', {
      url: '/daily',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu/daily/daily.html',
          controller: 'dailyCtrl'
        }
      },
      authenticate: true
    })
    .state('menu.journal', {
      url: '/journal',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu/journal/journal.html',
          controller: 'journalCtrl'
        }
      },
      authenticate: true
    })
    .state('menu.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu/search/search.html',
          controller: 'searchCtrl'
        }
      },
      authenticate: true
    })
    .state('menu.overview', {
      url: '/overview',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu/overview/overview.html',
          controller: 'overviewCtrl'
        }
      },
      // authenticate: true
    })



    .state('meals', {
      url: '/meals',
      // views: {
      //   'tab-meals': {
          templateUrl: 'templates/tabs/tab-meals.html',
          controller: 'MealListCtrl',
      //   }
      // },
      authenticate: true
    })
    // .state('tab.meals', {
    //   url: '/meals',
    //   views: {
    //     'tab-meals': {
    //       templateUrl: 'templates/tabs/tab-meals.html',
    //       controller: 'MealListCtrl'
    //     }
    //   },
    //   authenticate: true
    // })
    .state('comments', {
      url: '/comments/:id',
      // views: {
      //   'tab-meals': {
          templateUrl: 'templates/tabs/meal-comments.html',
          controller: 'MealCommentsCtrl',
      //   }
      // },
      authenticate: true
    })
    // .state('tab.comments', {
    //   url: '/comments/:id',
    //   views: {
    //     'tab-meals': {
    //       templateUrl: 'templates/tabs/meal-comments.html',
    //       controller: 'MealCommentsCtrl'
    //     }
    //   },
    //   authenticate: true
    // })
    .state('user-profile', {
      url: '/user-profile/:uid',
      // views: {
      //   'tab-meals': {
          templateUrl: 'templates/tabs/meal-user-profile.html',
          controller: 'UserProfileCtrl',
      //   }
      // },
      authenticate: true
    })
    .state('track', {
      url: '/track',
      // views: {
      //   'tab-track': {
          templateUrl: 'templates/tabs/tab-track.html',
          controller: 'MealTrackCtrl',
      //   }
      // },
      authenticate: true
    })
    .state('account', {
      url: '/account/',
      // views: {
      //   'tab-account': {
          templateUrl: 'templates/tabs/tab-account.html',
          controller: 'AccountCtrl',
      //   }
      // },
      authenticate: true
    });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/login');
  // $urlRouterProvider.otherwise('/tab/meals');
  // $urlRouterProvider.otherwise('/menu/daily');
  // $urlRouterProvider.otherwise('/menu/overview');
  // $urlRouterProvider.otherwise('/menu/search');
  // $urlRouterProvider.otherwise('/menu/pointsresults');
  // $urlRouterProvider.otherwise('/menu/personalinfo');
  // $urlRouterProvider.otherwise('/login');


     $urlRouterProvider.otherwise(function($injector, $location,$state){
   var state = $injector.get('$state');
   var condition = localStorage.getItem("trackeruserState");
   if(condition == "true"){
            var q = localStorage.getItem("Ispersonaldatasaved");
            if(q == "true"){
                state.go('menu.overview');
            }else{
                state.go('menu.personalinfo');
            }
   }
   else{
     state.go('login');
   }
  // state.go('home');
   
   return $location.path();
})

});


app.config(function($ionicCloudProvider) {

$ionicCloudProvider.init({
  "core": {
    "app_id": "3957e37c"
  },
  "auth": {
    "google": {
      "webClientId": "625805256500-m8qrb56i78rne6h1l5r449l44fh09a20.apps.googleusercontent.com",
      "scope": ["permission1", "permission2"]
    }
  }
});



$ionicCloudProvider.init({
  "core": {
    // "app_id": "1904396749778209"
    "app_id": "3957e37c"
  },
  "auth": {
    "facebook": {
      "scope": ["public_profile", "email"]
    }
  }



});




});
