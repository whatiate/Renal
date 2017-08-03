var app = angular.module('whatiate');

app.controller('MealCommentsCtrl', function($firebaseArray, $ionicLoading, $log, $scope, $state, $stateParams, AuthService, MealService,$rootScope) {
  // var user = AuthService.user;

  console.log(JSON.parse(localStorage.getItem("Userpersonalinfo")));
  var user = JSON.parse(localStorage.getItem("Userpersonalinfo"));

  // var user = {uid:$rootScope.myUid,profileImageURL:"https://firebase.google.com/_static/images/firebase/touchicon-180.png",email:"demo@demo.demo",displayName:"demo"};

  $scope.meals = MealService.mealsArray;
  $scope.meal = $scope.meals.$getRecord($stateParams.id);

  $scope.resetFormData = function() {
    $scope.formData = {
      'text': ''
    };
  };
  $scope.resetFormData();

  $scope.addComment = function() {
    var comment = {
      user: user,
      text: $scope.formData.text,
      created: new Date().getTime()
    };
    if (!$scope.meal.comments) {
      $scope.meal.comments = [];
    }
    $scope.meal.comments.push(comment);

    MealService.saveMeal($scope.meal);
    $scope.resetFormData();
  };

  $scope.goToUserProfile = function(comment) {
    if (user.uid === comment.user.uid) {
      $state.go('tab.account');
    } else {
      $state.go('tab.user-profile', { uid: comment.user.uid });
    }
  };
});
