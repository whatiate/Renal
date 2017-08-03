var app = angular.module('whatiate');

app.controller('UserProfileCtrl', function($scope, $stateParams, AuthService) {
  $scope.user1 = AuthService.getUserById($stateParams.uid);
  // console.log($scope.user)
  // console.log($scope.user.$id)

  $scope.$on('$ionicView.enter', function(){
  $scope.displayName = localStorage.getItem("userProfileViewName")
   $scope.profileImageURL = localStorage.getItem("userProfileViewImage")

  //  console.log($scope.user.displayName)
  //  console.log($scope.user.profileImageURL)
});

 
});
