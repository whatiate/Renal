var app = angular.module('whatiate');

app.controller('personalinfoCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$rootScope,$cordovaImagePicker,$cordovaCamera,$firebaseAuth,$firebaseArray) {
$rootScope.UserData = [];

        $scope.savePersonalInfo = function(){
         
          console.log($rootScope.UserData);
          
          if($scope.checkValid($rootScope.UserData.username) && $scope.checkValid($rootScope.UserData.age) && $scope.checkValid($rootScope.UserData.gender) && $scope.checkValid($rootScope.UserData.weight) && $scope.checkValid($rootScope.UserData.heightinfeets) && $scope.checkValid($rootScope.UserData.heightininche) && $scope.checkValid($rootScope.UserData.kidneystage) && $scope.checkValid($rootScope.UserData.morbid)){
              $rootScope.showD("Alert","The personal infomation form is empty, please update to save","Okay");
          }

          else if($scope.checkValid($rootScope.UserData.username)){$rootScope.showD("Alert","Username Can't be empty","Okay");}
          else if($scope.checkValid($rootScope.UserData.age)){$rootScope.showD("Alert","Age Can't be empty","Okay");}
          //else if($scope.checkValid($rootScope.UserData.gender)){$rootScope.showD("Alert","Gender Can't be empty","Okay");}
          else if($scope.checkValid($rootScope.UserData.weight)){$rootScope.showD("Alert","Weight Can't be empty","Okay");}
          else if($scope.checkValid($rootScope.UserData.heightinfeets)){$rootScope.showD("Alert","Height Can't be empty","Okay");}
          else if($scope.checkValid($rootScope.UserData.heightininche)){$rootScope.showD("Alert","you can write 0 in Height in inches","Okay");}
          else if($scope.checkValid($rootScope.UserData.kidneystage)){$rootScope.showD("Alert","Kidney stage Can't be empty","Okay");}
          else if($scope.checkValid($rootScope.UserData.morbid)){$rootScope.showD("Alert","Morbid Condition Can't be empty","Okay");}
          else{
                            
                            
                              // firebase.database().ref().child("User").child($rootScope.myUid).child("personalInfo").set({
                              // firebase.database().ref().child("User").child($rootScope.myUid).set({
                              //     username: $rootScope.UserData.username,
                              //     age:$rootScope.UserData.age,
                              //     gender:$rootScope.UserData.gender,
                              //     weight:$rootScope.UserData.weight,
                              //     heightinfeets:$rootScope.UserData.heightinfeets,
                              //     heightininche:$rootScope.UserData.heightininche,
                              //     // height:{feet:$rootScope.UserData.heightinfeets,inch:$rootScope.UserData.heightininche},
                              //     kidneystage:$rootScope.UserData.kidneystage,
                              //     morbid:$rootScope.UserData.morbid,
                              //     profile_picture : "imageUrl"
                              // });

                              var postData = {
                                    username: $rootScope.UserData.username,
                                    age:$rootScope.UserData.age,
                                    gender:$rootScope.UserData.gender,
                                    weight:$rootScope.UserData.weight,
                                    heightinfeets:$rootScope.UserData.heightinfeets,
                                    heightininche:$rootScope.UserData.heightininche,
                                    kidneystage:$rootScope.UserData.kidneystage,
                                    morbid:$rootScope.UserData.morbid,
                                    profile_picture : localStorage.getItem("userProfileImage"),

                                    uid : $rootScope.myUid,
                                    displayName : $rootScope.UserData.username,
                                    email : "abc@gmail.com",
                                    profileImageURL :  localStorage.getItem("userProfileImage") //"http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_03_hd_picture_166205.jpg"  

                                  };
                                  var newPostKey = firebase.database().ref().child('User').push().key;
                                  var updates = {};
                                  updates['/User/' + $rootScope.myUid] = postData;
                                  firebase.database().ref().update(updates);
                              // if($scope.ProImagePath != null || $scope.ProImagePath != '' || $scope.ProImagePath.length >0){
                              
                              //   $scope.UploadImageToFireBase($scope.ProImagePath,'profile',$rootScope.myUid) //filepath,type 'profile' or 'blog' ,uid
                              // }

                              
                              firebase.database().ref().child("User").child($rootScope.myUid).once("value")
                                .then(function(snapshot) {
                                var u = snapshot.val();
                                // var u = snapshot.child("personalInfo").val();
                                console.log(u)
                                localStorage.setItem("Userpersonalinfo",JSON.stringify(u));
                                });

                              
                            localStorage.setItem("Ispersonaldatasaved","true")
                           $rootScope.showD("Thank you","Your information is saved successfully","Okay");
          }
          
          };


       
        
              $scope.checkValid = function(str){
                if(str == null || str == '' || str.length<=0){
                  return true;
                }else{
                  return false;
                }
              };

         
         
        




        $scope.saved_age = function(a){
          console.log("my age is" +a);
          $scope.userAge = a;
        };

        $scope.checkStuff = function(a){
             console.log("my age is :" + a);
            $scope.userAge = a;
            console.log($scope.userAge)
        };


        $scope.PickImageFromGallery = function(){
           var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
                };

                $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                  console.log(results[0])
                  var image = document.getElementById('myImage');
                  image.src = results[0];
                  $scope.ProImagePath = results[0];
                  $scope.UploadImageToFireBase($scope.ProImagePath,'profile',$rootScope.myUid)
                      // setTimeout(function() {
                      //   localStorage.getItem()
                      // }, 1000);
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
                image.src = imageURI;
                console.log(imageURI)
                $scope.ProImagePath = imageURI;
                $scope.UploadImageToFireBase($scope.ProImagePath,'profile',$rootScope.myUid)
              }, function(err) {
                console.log(err)
              });

        };


    
        $scope.checkItems = { }

          $scope.print = function() {
              // console.log($scope.checkItems);
          }

          $scope.save = function() {
              $scope.selectedMorbid = [];
             
              for(i in $scope.checkItems) {
                  // console.log($scope.checkItems[i]);
                  if($scope.checkItems[i] == true) {
                    var tdata = {"Condition":i}
                      $scope.selectedMorbid.push(tdata);
                     
                  }
              }
            
          }


          $scope.$on('$ionicView.enter', function(){
           
            setTimeout(function() {  

            if(JSON.parse(localStorage.getItem('Userpersonalinfo')) != null){
                $rootScope.UserData = JSON.parse(localStorage.getItem('Userpersonalinfo'));
                console.log($rootScope.UserData)
            }else{
               $rootScope.UserData = [];
               console.log($rootScope.UserData)
            }

            $scope.myprofileImage = localStorage.getItem('userProfileImage')

            }, 5000);

          });
        















          $scope.resetAlldata = function(){
            console.log("jfgd")
            $rootScope.UserData.username = '';
            $rootScope.UserData.age = '';
            $rootScope.UserData.gender = '';
            $rootScope.UserData.weight = '';
            $rootScope.UserData.heightinfeets = '';
            $rootScope.UserData.heightininche = '';
            $rootScope.UserData.kidneystage = '';
            $rootScope.UserData.morbid = '';



          };



});
