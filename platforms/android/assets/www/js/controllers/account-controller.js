var app = angular.module('whatiate');

app.controller('AccountCtrl', function($scope, AuthService) {
  // $scope.user = AuthService.user;
  // $scope.logout = function() {
  //   AuthService.logout();
  // };

//     $scope.$on('$ionicView.enter', function(){
//   $scope.user.displayName = localStorage.getItem("userProfileViewName")
//    $scope.user.profileImageURL = localStorage.getItem("userProfileViewImage")

//    console.log($scope.user.displayName)
//    console.log($scope.user.profileImageURL)
// });


  $scope.$on('$ionicView.enter', function(){
  $scope.displayName = localStorage.getItem("userProfileViewName")
   $scope.profileImageURL = localStorage.getItem("userProfileViewImage")

  //  console.log($scope.user.displayName)
  //  console.log($scope.user.profileImageURL)
});

});
