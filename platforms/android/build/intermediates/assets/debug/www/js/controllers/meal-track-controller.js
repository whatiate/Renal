var app = angular.module('whatiate');

app.controller('MealTrackCtrl',
  function($http, $ionicLoading, $ionicModal, $ionicPopup, $log, $q, $state,
    $scope, $timeout, $window, AuthService, AwsService, LocationService, MealService,
    nutritionixApi, UtilService,$cordovaImagePicker,$cordovaCamera,$firebaseAuth ,$rootScope,$ionicHistory) {

      
     

    ////////////////////////////////////////////// Search Food modal
    $ionicModal.fromTemplateUrl('templates/modals/search-food-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    ////////////////////////////////////////////// Search Food modal models and methods
    $scope.searchFoodFormData = {
      text: 'Coca-cola',
      format: 'text'
    };

    $scope.searchFoodResults = null;

    $scope.search = function(form) {
      if (!form.$valid) return;

      $ionicLoading.show();

      var URL = '';
      var keyValObject = {
        '[APPID]': nutritionixApi.credentials.appId,
        '[APPKEY]': nutritionixApi.credentials.appKey
      };
      if ('text' === $scope.searchFoodFormData.format) {
        keyValObject['[TEXT]'] = $scope.searchFoodFormData.text;
        keyValObject['[FIELDS]'] = _.join(nutritionixApi.text.fields, ',');
        URL = UtilService.createURLstring(nutritionixApi.text.url, keyValObject);
        console.log(URL)
      } else {
        keyValObject['[BARCODE]'] = $scope.searchFoodFormData.text;
        URL = UtilService.createURLstring(nutritionixApi.barcode.url, keyValObject);
        console.log(URL)
      }

      $http({
          method: 'GET',
          url: URL
        })
        .then(function successCallback(response) {
          $log.info(response);
          if ('text' === $scope.searchFoodFormData.format) {
            $scope.searchFoodResults = response.data.hits;
          } else {
            var tempObj = [{ _id: response.data.item_id, fields: response.data }];
            $scope.searchFoodResults = tempObj;
          }
        })
        .catch(function errorCallback(error) {
          $log.error(error);
          $scope.searchFoodResults = [];
        })
        .finally(function() {
          $ionicLoading.hide();
          $scope.searchFoodFormData.format = 'text';
        });
    };

    $scope.readBarCode = function(form) {
      if (!$window.cordova) return;

      UtilService.readBarCode()
        .then(function(barcodeData) {
          $log.info(barcodeData);
          $scope.searchFoodFormData.text = barcodeData.text;
          $scope.searchFoodFormData.format = barcodeData.format;
          $scope.search(form);
        })
        .catch(function(error) {
          $log.error(error);
        });
    };

    $scope.addMealItemToList = function(item) {
      $ionicLoading.show();

      if (!_.find($scope.createMealFormData.mealItemsList, { '_id': item._id })) {
        $scope.createMealFormData.mealItemsList.push(item);
      }
      calculateMealItemsListTotalCalories();
      $timeout(function() {
        $ionicLoading.hide();
      }, 500);
    };

    // ////////////////////////////////////////////// Track Meal Stuff
    $scope.mealItemsListOptions = {
      showDelete: false
    };

    $scope.reserCreateMealFormData = function() {
      $scope.createMealFormData = {
        description: 'Very nice meal!',
        picture: null,
        calories: 0,
        itemsQty: 0,
        mealItemsList: []
      };
      calculateMealItemsListTotalCalories();
    };
    $scope.reserCreateMealFormData();
    
    $scope.$on('$ionicView.enter', function(){
      console.log(JSON.parse(localStorage.getItem("Userpersonalinfo")));
      $scope.user1 = JSON.parse(localStorage.getItem("Userpersonalinfo"));
        var TempImage = localStorage.getItem("OverviewImage")
          console.log(TempImage)
          if(TempImage != null || TempImage != '' || TempImage.length > 0){
              $scope.createMealFormData.picture = TempImage;
          }
    });
    $scope.$on('$ionicView.beforeLeave', function(){
      localStorage.setItem("OverviewImage",null)
    });



    

    $scope.createMealFormData.picture = 
    $scope.removeMealItemFromList = function(item) {
      _.remove($scope.createMealFormData.mealItemsList, function(i) {
        return i._id === item._id;
      });
      calculateMealItemsListTotalCalories();
    };

    $scope.toggleMealItemQty = function(item, action) {
      if (!item.fields.qty) {
        item.fields.qty = 1;
      }
      if (action === 'more') {
        item.fields.qty += 1;
      } else {
        if (item.fields.qty > 1) {
          item.fields.qty -= 1;
        }
      }
      calculateMealItemsListTotalCalories();
    };

    $scope.addPicture = function(source) {
      if (!$window.cordova) return;

      UtilService.getPicture(source)
        .then(function(imageData) {
          $scope.createMealFormData.picture = imageData;
        })
        .catch(function(error) {
          $ionicPopup.alert({
            title: 'Error getting picture',
            subTitle: 'We had a problem trying to get that picture, please try again. ' + error
          });
        });
    };

    $scope.trackMeal = function(form) {
      if (!form.$valid) return;
      $ionicLoading.show();

      addMeal()
        .then(afterMealAddedHandler)
        .then(function(reference) {
          $scope.reserCreateMealFormData();
          $ionicLoading.hide();
          $state.go("meals");
        })
        .catch(function(error) {
          $ionicLoading.hide();
          $log.error(error);
          $ionicPopup.alert({
            title: 'Error saving meal',
            subTitle: 'We had a problem trying to save that meal, please try again.'
          });
        });
    };

    var addMeal = function() {
      var meal = {
        user: $scope.user1,
        // user: AuthService.user,
        title: $scope.createMealFormData.description,
        calories: $scope.createMealFormData.calories,
        itemsQty: $scope.createMealFormData.itemsQty,
        items: $scope.createMealFormData.mealItemsList,
        created: new Date().getTime(),
        order: (new Date().getTime()) * -1
      };
      console.log(meal)
      return MealService.mealsArray.$add(meal);
    };

    var afterMealAddedHandler = function(reference) {
      console.log(reference)
      if ($scope.createMealFormData.picture) {
        // return UtilService.getFileRef($scope.createMealFormData.picture)
        //   .then(function(fileEntry) {
            var promises = {
              // imageURL: UtilService.uploadFileToAWS(fileEntry),
              imageURL: UtilService.uploadFileToAWS($scope.createMealFormData.picture,"blog",$rootScope.myUid),
              // GPSinfo: LocationService.getGPSinfo(fileEntry)
            };

            return $q.all(promises)
              .then(function(promisesArray) {
                console.log(reference)
                var id = reference.key;
                var record = MealService.mealsArray.$getRecord(id);
                record.imageURL = promisesArray.imageURL;
                // record.GPSinfo = promisesArray.GPSinfo;
                return MealService.mealsArray.$save(record);
              });
          // });
      } else {
        return 'there was no picture';
      }
    };

    function calculateMealItemsListTotalCalories() {
      var totalCalories = 0;
      var totalItems = 0;
      $scope.createMealFormData.mealItemsList.map(function(item) {
        var qty = item.fields.qty ? item.fields.qty : 1;
        totalCalories += (item.fields.nf_calories * qty);
        totalItems += qty;
        item.fields.qty_calories = parseFloat(item.fields.nf_calories * qty).toFixed(2);
      });
      $scope.createMealFormData.calories = parseFloat(totalCalories).toFixed(2);
      $scope.createMealFormData.itemsQty = totalItems;
    }



    // ====================== Umesh =========================

        $scope.PickImageFromGallery = function(){
           var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
                };

                $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                  // console.log(results[0])
                  var image = document.getElementById('myImage');
                  $scope.createMealFormData.picture = results[0];
                }, function(error) {
                  console.log(error);
                });
        };

        $scope.PickImageFromCamera = function(){
          var options = {
              destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
              };

              $cordovaCamera.getPicture(options).then(function(imageURI) {
                var image = document.getElementById('myImage');
                $scope.createMealFormData.picture = imageURI;
                console.log(imageURI)
              }, function(err) {
                console.log(err)
              });

        };




       $scope.goto_overview = function() {
            // console.log('Going back');
           // $ionicHistory.goBack();
           $state.go('menu.overview')
          } 



  });


//  $cordovaEmailComposer.open(email).then(null, function (result) {
//     console.log(result)
//  },function(err){
//     console.log(err)
//  });