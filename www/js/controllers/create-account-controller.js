var app = angular.module('whatiate');

app.controller('CreateAccountCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$firebaseAuth,$firebaseArray,$rootScope) {
  $scope.resetFormData = function() {
    $scope.createAccoutnFormData = {
      'email': '',
      'password': ''
    };
  };
  $scope.resetFormData();

  $scope.createAccount = function(form) {
    if (form.$valid) {
      console.log(form);
      console.log(form.email.$viewValue);
      console.log(form.password.$viewValue);
      $ionicLoading.show();
      // AuthService.createAccount($scope.createAccoutnFormData)
      //   .then(loginAfterAccountCreated)
      //   .then(redirectAfterLoginWithEmailAndPassword)
      //   .catch(errorHandler);

      $firebaseAuth().$createUserWithEmailAndPassword(form.email.$viewValue,form.password.$viewValue)
        .then(function(firebaseUser) {
          console.log("User " + firebaseUser.uid + " created successfully!");
           firebase.database().ref().child("User").child(firebaseUser.uid).child("email").set(form.email.$viewValue)

              // var ref = firebase.database().ref().child("User");
              //  $scope.Users = $firebaseArray(ref);
              //   $scope.Users.$add({
              //         Email: form.email.$viewValue
              //       });
            
              localStorage.setItem("trackeruserToken",firebaseUser.uid)
              localStorage.setItem("trackeruserState","true")
              $ionicLoading.hide();
              // $state.go("menu.overview")
                var p = localStorage.getItem("Ispersonaldatasaved");
                if(p == "true"){
                    $state.go('menu.overview');
                }else{
                    $state.go('menu.personalinfo');
                }
              
          }).catch(function(error) {
            $ionicLoading.hide();
            console.error(error);
            if(error.code == "auth/email-already-in-use"){
                $rootScope.showD("Alert","The email address is already registered with us, please login","Okay");
            }
        });


    }
  };

  var loginAfterAccountCreated = function(userData) {
    $log.info(userData);
    return AuthService.loginWithEmailAndPassword($scope.createAccoutnFormData);
  };

  var redirectAfterLoginWithEmailAndPassword = function(authData) {
    $log.info(authData);
    $timeout(function() {
      $ionicLoading.hide();
      $scope.resetFormData();
      $state.go('authenticated');
    }, 2000);
  };

  var errorHandler = function(error) {
    $log.error(error);
    $ionicLoading.hide();
    $ionicPopup.alert({
      title: 'Error creating account',
      subTitle: error
    });
  };





// $firebaseAuth().$signInWithEmailAndPassword(form.email, form.password).then(function(firebaseUser) {
//               console.log(firebaseUser);
//               // fireBaseData.refUser().child(result.uid).child('token').set(""+$rootScope.user_token);
//               // firebase.database().ref().child("User").child(firebaseUser.uid).child("email").set(form.email)
//               localStorage.setItem("trackeruserToken",firebaseUser.uid)
//               localStorage.setItem("trackeruserState","true")
//               $ionicLoading.hide();
//               $state.go("menu.overview")
//           }).catch(function(error) {
//             if(error.code == "auth/user-not-found"){
//               $rootScope.showD("Alert","User not found,Signup first","Okay");
//             }else if(error.code == "auth/wrong-password"){
//               $rootScope.showD("Alert","Wrong Password","Okay");
//             }
//             console.error("Authentication failed:", error);
//           });











});
