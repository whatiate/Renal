var app = angular.module('whatiate');

app.controller('MealListCtrl', function($cordovaSocialSharing, $firebaseArray,
  $ionicLoading, $log, $scope, $state, $timeout, $window,
  AuthService, chunkSize, MealService,$rootScope) {
  // var user = AuthService.user;

  console.log(JSON.parse(localStorage.getItem("Userpersonalinfo")));
  var user = JSON.parse(localStorage.getItem("Userpersonalinfo"));
  // var user = {uid:$rootScope.myUid,profileImageURL:"https://firebase.google.com/_static/images/firebase/touchicon-180.png", email:"demo@demo.demo",displayName:"demo"};


  $ionicLoading.show();

  $scope.userLikedMeals = [];
  $scope.userCommentedMeals = [];
  $scope.moreItemsAvailable = true;

  var mealsRef = MealService.mealsRef;
  $scope.meals = MealService.mealsArray;

  $scope.meals.$loaded().then(function(meals) {
    $ionicLoading.hide();
  }).catch(function(error) {
    $ionicLoading.hide();
    $log.error(error);
  });

  $scope.meals.$watch(function(obj) {
    if ($scope.meals.$getRecord(obj.key)) {
      refreshMealMeta($scope.meals.$getRecord(obj.key));
    }
    // if (mealsRef.scroll.hasNext()) {
    //   $scope.moreItemsAvailable = true;
    // }
  });

  // mealsRef.scroll.next(chunkSize);

  $scope.loadMore = function() {
    // $timeout(function() {
    //   if (mealsRef.scroll.hasNext()) {
    //     $scope.moreItemsAvailable = true;
    //     mealsRef.scroll.next(chunkSize);
    //     $scope.$broadcast('scroll.infiniteScrollComplete');
    //   } else {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.moreItemsAvailable = false;
    //   }
    // }, 500);
  };

  // $scope.goToUserProfile = function(meal) {
  //   if (user.uid === meal.user.uid) {
  //     $state.go('account');
  //   } else {
  //     $state.go('user-profile', { uid: meal.user.uid });
  //   }
  // };
  $scope.goToUserProfile = function(meal,name,image) {
    if (user.uid === meal.user.uid) {
      localStorage.setItem("userProfileViewName",name)
      localStorage.setItem("userProfileViewImage",image)
      $state.go('account');
    } else {
      localStorage.setItem("userProfileViewName",name)
      localStorage.setItem("userProfileViewImage",image)
      $state.go('user-profile', { uid: meal.user.uid });
    }
  };

  $scope.toggleLike = function(meal) {
    if (!mealHasUserLike(meal)) {
      meal = addLike(meal);
    } else {
      meal = removeLike(meal);
    }
    MealService.saveMeal(meal);
  };

  function addLike(meal) {
    if (!meal.likes) {
      meal.likes = [];
    }
    meal.likes.push(user.uid);
    return meal;
  }

  function removeLike(meal) {
    _.remove(meal.likes, function(like) {
      return like === user.uid;
    });
    return meal;
  }

  function mealHasUserLike(meal) {
    if (!meal.likes) {
      return false;
    }
    return _.indexOf(meal.likes, user.uid) !== -1;
  }

  function mealHasUserComment(meal) {
    if (!meal.comments) {
      return false;
    }
    return _.findIndex(meal.comments, function(c) {
      return c.user.uid === user.uid;
    }) !== -1;
  }

  function refreshMealMeta(meal) {
    if (mealHasUserLike(meal)) {
      _.pull($scope.userLikedMeals, meal.$id);
      $scope.userLikedMeals.push(meal.$id);
    } else {
      _.pull($scope.userLikedMeals, meal.$id);
    }
    meal.userComment = mealHasUserComment(meal);
  }

  $scope.share = function(meal) {
    // if (!$window.cordova) return;
    console.log(meal);
    console.log(meal.title);
    console.log(meal.imageURL);
    // $ionicLoading.show();

    $cordovaSocialSharing
    .share(meal.title, meal.title, meal.imageURL, "http://www.flaticon.com/") 
    .then(function(result) {
      console.log(result);
    }, function(err) {
      console.log(err);
    });



    // $cordovaSocialSharing
    //   .share(meal.title, meal.title, meal.imageURL, null)
    //   // .share(meal.title, meal.title, decodeURIComponent(meal.imageURL), null)
    //   .then(function(result) {
    //     $log.info(result);
    //     $ionicLoading.hide();
    //   }, function(err) {
    //     $log.error(err);
    //     $ionicLoading.hide();
    //   });
  };


// $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
//   viewData.enableBack = true;
// });

// $("#searchbtns").click(function(){
//         // $("p").hide();
//         console.log("clicked")
         
        
//     });

});
