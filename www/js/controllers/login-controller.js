var app = angular.module('whatiate');

app.controller('LoginCtrl', function($ionicLoading, $ionicPopup, $log, $rootScope, $scope,
  $state, $timeout, AuthService,$firebaseAuth,$firebaseArray,$cordovaToast,$ionicGoogleAuth,$ionicFacebookAuth,$ionicUser,$ionicAuth,$cordovaFacebook) {
  $scope.resetFormData = function() {
    $scope.loginFormData = {
      email: '',
      password: ''
    };
  };
  $scope.resetFormData();
$scope.form = [];
  $scope.login = function(provider, form) {

if((form.email == null || form.email == '') && (form.password == null || form.password == '')){
  $rootScope.showD("Alert","Please fill up Email and Password","Okay");
}else if(form.email == null || form.email == ''){
  $rootScope.showD("Alert","Please fill up Email Address","Okay");
}else if(form.password == null || form.password == ''){
  $rootScope.showD("Alert","Please fill up Password","Okay");
}else {


    if ('password' === provider) {
      $ionicLoading.show();
        $firebaseAuth().$signInWithEmailAndPassword(form.email, form.password).then(function(firebaseUser) {
              console.log(firebaseUser);
              console.log("Signed in as:", firebaseUser.uid);
              localStorage.setItem("trackeruserToken",firebaseUser.uid)
              localStorage.setItem("trackeruserState","true")
              $ionicLoading.hide();
              var p = localStorage.getItem("Ispersonaldatasaved");
              if(p == "true"){
                    $state.go('menu.overview');
                    console.log("go to overview")
                }else{
                    $state.go('menu.personalinfo');
                     console.log("go to personalinfo")
                }
              $rootScope.Toast("Login Successfully");
          }).catch(function(error) {
            $ionicLoading.hide();
            if(error.code == "auth/user-not-found"){
              $rootScope.showD("Alert","User not found,Signup first","Okay");
            }else if(error.code == "auth/wrong-password"){
              $rootScope.showD("Alert","The password is invalid or the user does not have a password","Okay");
            }
            console.error("Authentication failed:", error);
          });
    } else {
      $ionicLoading.hide();
      AuthService.thirdPartyLogin(provider);
    }


}


  };

  var redirectAfterLoginWithEmailAndPassword = function(authData) {
    $log.info(authData);
    $timeout(function() {
      $ionicLoading.hide();
      $scope.resetFormData();
      $state.go('tab.meals');
    }, 2000);
  };

  var errorHandler = function(error) {
    $log.error(error);
    $ionicLoading.hide();
    $ionicPopup.alert({
      title: 'Login error',
      subTitle: error
    });
  };

  // Listen for AuthService auth event
  // AuthService.usersAuth.$onAuth(function(authData) {
  //   if (authData && !$rootScope.offline) {
  //     $log.info("Logged in as:", authData);
  //     AuthService.setUser(authData);
  //     $scope.user = AuthService.user;
  //     $ionicLoading.show({
  //       template: authData[authData.provider].displayName ? 'Logged in as ' + authData[authData.provider].displayName + '!' : 'Login success',
  //       duration: 2000
  //     });
  //     $timeout(function() {
  //       $state.go('tab.meals');
  //     }, 2000);
  //   } else {
  //     $scope.user = null;
  //     AuthService.logout();
  //   }
  // });

    

  $scope.loginWithfacebook = function(){
    var ref = firebase.auth();
    // var ref = new Firebase("https://whatiate-d5b2f.firebaseio.com");
     $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
 
    console.log(success);
    console.log(success.authResponse.accessToken);
    console.log(success.authResponse.userID);
      var email = success.authResponse.userID+"@gmail.com";
      var userId = success.authResponse.userID;


      $firebaseAuth().$createUserWithEmailAndPassword(email,userId)
        .then(function(firebaseUser) {
          console.log("User " + firebaseUser.uid + " created successfully!");
           firebase.database().ref().child("User").child(firebaseUser.uid).child("email").set(email)
              localStorage.setItem("trackeruserToken",firebaseUser.uid)
              localStorage.setItem("trackeruserState","true")
              $ionicLoading.hide();
              // $state.go("menu.overview")
              var p = localStorage.getItem("Ispersonaldatasaved");
                if(p == "true"){
                    $state.go('menu.overview');
                    console.log("go to overview")
                }else{
                    $state.go('menu.personalinfo');
                     console.log("go to personalinfo")
                }
          }).catch(function(error) {
          console.error(error);
              if(error.code == "auth/email-already-in-use"){
                      $firebaseAuth().$signInWithEmailAndPassword(email,userId).then(function(firebaseUser) {
                            console.log(firebaseUser);
                            console.log("Signed in as:", firebaseUser.uid);
                            localStorage.setItem("trackeruserToken",firebaseUser.uid)
                            localStorage.setItem("trackeruserState","true")
                            $ionicLoading.hide();
                            // $state.go("menu.overview")
                            var q = localStorage.getItem("Ispersonaldatasaved");
                            if(q == "true"){
                                $state.go('menu.overview');
                            }else{
                                $state.go('menu.personalinfo');
                            }
                            $rootScope.Toast("Login Successfully");
                      }).catch(function(error) {
                        $ionicLoading.hide();
                            if(error.code == "auth/user-not-found"){
                              $rootScope.showD("Alert","User not found,Signup first","Okay");
                            }else if(error.code == "auth/wrong-password"){
                              // $rootScope.showD("Alert","Wrong Password","Okay");
                              $rootScope.showD("Alert","The email address is already in use by another account","Okay");
                            }
                          console.error("Authentication failed:", error);
                      });
              }
        });



      
      //     firebase.auth().createCustomToken(success.authResponse.userID).then(function(customToken) {
      //     console.log(customToken)
      //      firebase.auth().signInWithCustomToken(success.authResponse.accessToken).catch(function(error) {
      //         console.log(error);
      //       });

      // })
      // .catch(function(error) {
      //   console.log("Error creating custom token:", error);
      // });




     



  }, function(error){
    console.log(error);
  });


      


  };

  $scope.loginWithTwitter = function(){

       console.log("loginwithtwitter")
      $ionicAuth.login('twitter').then(function(){
          var q = $ionicUser.social.twitter;
            console.log(q)
            console.log(q.uid)

var email = q.uid+"@gmail.com";
var userId = q.uid;

            $firebaseAuth().$createUserWithEmailAndPassword(email,userId)
        .then(function(firebaseUser) {
          console.log("User " + firebaseUser.uid + " created successfully!");
           firebase.database().ref().child("User").child(firebaseUser.uid).child("email").set(email)
              localStorage.setItem("trackeruserToken",firebaseUser.uid)
              localStorage.setItem("trackeruserState","true")
              $ionicLoading.hide();
              // $state.go("menu.overview")
              var p = localStorage.getItem("Ispersonaldatasaved");
                if(p == "true"){
                    $state.go('menu.overview');
                    console.log("go to overview")
                }else{
                    $state.go('menu.personalinfo');
                     console.log("go to personalinfo")
                }
          }).catch(function(error) {
          console.error(error);
              if(error.code == "auth/email-already-in-use"){
                      $firebaseAuth().$signInWithEmailAndPassword(email,userId).then(function(firebaseUser) {
                            console.log(firebaseUser);
                            console.log("Signed in as:", firebaseUser.uid);
                            localStorage.setItem("trackeruserToken",firebaseUser.uid)
                            localStorage.setItem("trackeruserState","true")
                            $ionicLoading.hide();
                            // $state.go("menu.overview")
                            var q = localStorage.getItem("Ispersonaldatasaved");
                            if(q == "true"){
                                $state.go('menu.overview');
                            }else{
                                $state.go('menu.personalinfo');
                            }
                            $rootScope.Toast("Login Successfully");
                      }).catch(function(error) {
                        $ionicLoading.hide();
                            if(error.code == "auth/user-not-found"){
                              $rootScope.showD("Alert","User not found,Signup first","Okay");
                            }else if(error.code == "auth/wrong-password"){
                              // $rootScope.showD("Alert","Wrong Password","Okay");
                              $rootScope.showD("Alert","The email address is already in use by another account","Okay");
                            }
                          console.error("Authentication failed:", error);
                      });
              }
        });










      },function(er){
        console.log(er)
      });

      // var provider = new firebase.auth.TwitterAuthProvider();
      // console.log(provider)
      // firebase.auth().signInWithPopup(provider).then(function(result) {
      // console.log(result)
      // }).catch(function(error) {
      //   console.log(error)
      // });


  };

  $scope.loginWithGoogle = function(){

       window.plugins.googleplus.login({
                scopes: '', 
                webClientId: '625805256500-m8qrb56i78rne6h1l5r449l44fh09a20.apps.googleusercontent.com',   // Web Client id 
                // webClientId: '625805256500-chsfdibbktrikg0495iagv10ds2bfo5t.apps.googleusercontent.com',  // Android Web Client id 
                offline: true 
          },function (user_data) {
            $ionicLoading.show();
            console.log(user_data);
              //  var displayName=user_data.displayName;
               var email=user_data.email;
              //  var imageUrl=user_data.imageUrl+"?sz=256";
               var userId=user_data.userId;
            
            
      $firebaseAuth().$createUserWithEmailAndPassword(email,userId)
        .then(function(firebaseUser) {
          console.log("User " + firebaseUser.uid + " created successfully!");
           firebase.database().ref().child("User").child(firebaseUser.uid).child("email").set(email)
              localStorage.setItem("trackeruserToken",firebaseUser.uid)
              localStorage.setItem("trackeruserState","true")
              $ionicLoading.hide();
              // $state.go("menu.overview")
              var p = localStorage.getItem("Ispersonaldatasaved");
                if(p == "true"){
                    $state.go('menu.overview');
                    console.log("go to overview")
                }else{
                    $state.go('menu.personalinfo');
                     console.log("go to personalinfo")
                }
          }).catch(function(error) {
          console.error(error);
              if(error.code == "auth/email-already-in-use"){
                      $firebaseAuth().$signInWithEmailAndPassword(email,userId).then(function(firebaseUser) {
                            console.log(firebaseUser);
                            console.log("Signed in as:", firebaseUser.uid);
                            localStorage.setItem("trackeruserToken",firebaseUser.uid)
                            localStorage.setItem("trackeruserState","true")
                            $ionicLoading.hide();
                            // $state.go("menu.overview")
                            var q = localStorage.getItem("Ispersonaldatasaved");
                            if(q == "true"){
                                $state.go('menu.overview');
                            }else{
                                $state.go('menu.personalinfo');
                            }
                            $rootScope.Toast("Login Successfully");
                      }).catch(function(error) {
                        $ionicLoading.hide();
                            if(error.code == "auth/user-not-found"){
                              $rootScope.showD("Alert","User not found,Signup first","Okay");
                            }else if(error.code == "auth/wrong-password"){
                              // $rootScope.showD("Alert","Wrong Password","Okay");
                              $rootScope.showD("Alert","The email address is already in use by another account","Okay");
                            }
                          console.error("Authentication failed:", error);
                      });
              }
        });


            },function (msg) {
            //    console.log(msg)
               alert(msg);
            });  

    // debugger;
      // $ionicGoogleAuth.login().then(function(){
      //   console.log($ionicUser.social.facebook.data.full_name);
      // },function(err){
      //   console.log(err)
      // });
  };
  $scope.loginWithGitHub = function(){

       console.log("loginwithgithub")
     $ionicAuth.login('github').then(function(){
          var q = $ionicUser.social.github;
            console.log(q)
            console.log(q.data.email)
            console.log(q.uid)
            var email = q.data.email;
            var userId = q.uid;



            $firebaseAuth().$createUserWithEmailAndPassword(email,userId)
        .then(function(firebaseUser) {
          console.log("User " + firebaseUser.uid + " created successfully!");
           firebase.database().ref().child("User").child(firebaseUser.uid).child("email").set(email)
              localStorage.setItem("trackeruserToken",firebaseUser.uid)
              localStorage.setItem("trackeruserState","true")
              $ionicLoading.hide();
              // $state.go("menu.overview")
              var p = localStorage.getItem("Ispersonaldatasaved");
                if(p == "true"){
                    $state.go('menu.overview');
                    console.log("go to overview")
                }else{
                    $state.go('menu.personalinfo');
                     console.log("go to personalinfo")
                }
          }).catch(function(error) {
          console.error(error);
              if(error.code == "auth/email-already-in-use"){
                      $firebaseAuth().$signInWithEmailAndPassword(email,userId).then(function(firebaseUser) {
                            console.log(firebaseUser);
                            console.log("Signed in as:", firebaseUser.uid);
                            localStorage.setItem("trackeruserToken",firebaseUser.uid)
                            localStorage.setItem("trackeruserState","true")
                            $ionicLoading.hide();
                            // $state.go("menu.overview")
                            var q = localStorage.getItem("Ispersonaldatasaved");
                            if(q == "true"){
                                $state.go('menu.overview');
                            }else{
                                $state.go('menu.personalinfo');
                            }
                            $rootScope.Toast("Login Successfully");
                      }).catch(function(error) {
                            if(error.code == "auth/user-not-found"){
                              $rootScope.showD("Alert","User not found,Signup first","Okay");
                            }else if(error.code == "auth/wrong-password"){
                              // $rootScope.showD("Alert","Wrong Password","Okay");
                              $rootScope.showD("Alert","The email address is already in use by another account","Okay");
                            }
                          console.error("Authentication failed:", error);
                      });
              }else if(error.code == "auth/network-request-failed"){
                $rootScope.showD("Alert"," A network error (such as timeout, interrupted connection or unreachable host) has occurred.","Okay");
               
              }
        });






      },function(er){
        console.log(er)
      });
  };

  

          

      


          // $scope.demo = function(){
          //   console.log("jkfhjkd")


          //       firebase.database().ref().child("meals").set({
          //                         name: "umesh"
                                  
          //                     });

          // };





});
