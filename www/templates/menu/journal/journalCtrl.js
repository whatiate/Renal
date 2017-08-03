var app = angular.module('whatiate');

app.controller('journalCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$ionicModal) {


    $scope.loadData = function(){
       $scope.journal_data = JSON.parse(localStorage.getItem("myJuornalData"))
       console.log($scope.journal_data)
       console.log($scope.journal_data.length)
    };


    $scope.$on('$ionicView.enter', function(){
        $scope.loadData();
    });


      $scope.removemyfood = function(ind){
            console.log(ind)
            $scope.journal_data.splice(ind, 1);
            localStorage.setItem("myJuornalData", JSON.stringify($scope.journal_data));
            $scope.loadData();
    };


});
