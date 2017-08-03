var app = angular.module('whatiate');

app.controller('mainCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$rootScope,$ionicHistory,$ionicSideMenuDelegate,$cordovaToast,$cordovaNetwork) {

$rootScope.alphabtchar = '';

$scope.$on('$ionicView.beforeEnter', function(){
  $rootScope.myUid = localStorage.getItem("trackeruserToken")
  // console.log($rootScope.myUid)
});
  

    $rootScope.agedata = [];

      for (var i = 0; i <=100 ; i++) { 
          var myObj = {"age":i}
          $rootScope.agedata.push( myObj );
          
      }
       
        $rootScope.sdialog = function(popupname) {
          $scope.templatepath = '';
          if(popupname == "age"){$scope.templatepath = 'dialog/age.html'}
          if(popupname == "kidny"){$scope.templatepath = 'dialog/kidney_stage.html'}
          if(popupname == "comorbid"){$scope.templatepath = 'dialog/co_morbid_condition.html'}
          if(popupname == "image"){$scope.templatepath = 'dialog/imagechoose.html'}
          if(popupname == "logout"){$scope.templatepath = 'dialog/logout.html'}
          if(popupname == "overviewimage"){$scope.templatepath = 'dialog/imagechooseoverview.html'}


            if($scope.templatepath != ''){
                $scope.alertPopup = $ionicPopup.alert({
                  templateUrl: $scope.templatepath,
                  scope : $scope    
                });
            }else{
              console.log("sorry , does not get popup's path")
            }
          


        };
        
        $rootScope.hdialog = function(){
          $scope.alertPopup.close();
        }


        $rootScope.showD = function(poptitle,popinst,popbtn) {
            $scope.poptitle = poptitle;
            $scope.popinst = popinst;
            $scope.popbtn = popbtn;

          $scope.cmnPopup = $ionicPopup.alert({
              templateUrl: 'dialog/common.html',
              scope : $scope    
          });
          };
          $rootScope.hideD = function(){
            $scope.cmnPopup.close();
          }

          $rootScope.goBack = function() {
            // console.log('Going back');
            $ionicHistory.goBack();
          }

          
 
          $scope.Logout = function(){
            localStorage.setItem("trackeruserToken",null)
            localStorage.setItem("trackeruserState","false")
            localStorage.setItem("Ispersonaldatasaved","false")
            $rootScope.UserEmailAddress = null;
            $rootScope.UserData = null
            // $window.localStorage.clear();
            // $ionicHistory.clearCache();
            // $ionicHistory.clearHistory();
            $state.go('login');
          };



            $scope.$on('$ionicView.enter', function(){
          $scope.UseInfo = JSON.parse(localStorage.getItem("Userpersonalinfo"));
            console.log($scope.UseInfo)
            if($scope.UseInfo != null){

                $rootScope.UserData = $scope.UseInfo;

                if($scope.UseInfo.kidneystage == "Stage 1"){
                  $rootScope.UserStData = $scope.stage1Json;
                }
                else if($scope.UseInfo.kidneystage == "Stage 2")
                {
                  $rootScope.UserStData = $scope.stage2Json;
                }
                else if($scope.UseInfo.kidneystage == "Stage 3")
                {
                  $rootScope.UserStData = $scope.stage3Json;
                }
                else if($scope.UseInfo.kidneystage == "Stage 4")
                {
                  $rootScope.UserStData = $scope.stage4Json;
                }
                else if($scope.UseInfo.kidneystage == "Stage 5/ESRD")
                {
                  $rootScope.UserStData = $scope.stage5Json;
                }

            }

//console.log($rootScope.UserStData)

            var Islogin = localStorage.getItem("trackeruserState")
                // console.log("User Login : "+Islogin);
                if(Islogin == true || Islogin == "true"){

                           

                            firebase.database().ref().child("User").child($rootScope.myUid).once("value")
                            .then(function(snapshot) {
                              $scope.UserPersonalInfo = snapshot.val(); // {first:"Ada",last:"Lovelace"}
                              // console.log($scope.UserPersonalInfo)
                              // console.log($scope.UserPersonalInfo.email)
                              // console.log($scope.UserPersonalInfo.username)
                              // console.log($scope.UserPersonalInfo.username.length)

                              if($scope.UserPersonalInfo.username != undefined){
                                localStorage.setItem("Ispersonaldatasaved","true")
                              }


                              localStorage.setItem("Userpersonalinfo",JSON.stringify($scope.UserPersonalInfo));
                            });
                }


        });


         $scope.$watch(function() { 
          return $ionicSideMenuDelegate.getOpenRatio();
        }, 
          function(ratio) {
            $scope.data=ratio;
            if( ratio == 1){
              // debugger;
               firebase.database().ref().child("User").child($rootScope.myUid).once("value")
                .then(function(snapshot) {
                $rootScope.UserEmailAddress = snapshot.child("email").val();
                // debugger;
                });
            }else{}

          });




          $scope.goto_dailyrecommondation = function(){
            if(localStorage.getItem("Ispersonaldatasaved") == "true"){
              $state.go("menu.daily");
            }else{
              $rootScope.showD("Alert","please fillup your personal information","Okay");
            }
          };

          $scope.goto_overview = function(){
            if(localStorage.getItem("Ispersonaldatasaved") == "true"){
              $state.go("menu.overview");
            }else{
              $rootScope.showD("Alert","please fillup your personal information","Okay");
            }
          };

          $scope.goto_track = function(){
            if(localStorage.getItem("Ispersonaldatasaved") == "true"){
              $state.go("track");
            }else{
              $rootScope.showD("Alert","please fillup your personal information","Okay");
            }
          };


           
          

          $rootScope.Toast = function(msg){
            $cordovaToast.show(msg, 'long', 'center')
                    .then(function(success) {
                      // success
                    }, function (error) {
                      // error
                    });
          };
          


          $scope.numberWithCommas = function(x){
              return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }



          
// =========================== Nutreents JSONs =================================

          var JSon1 = [{
            "Sodium":"2300",
            "Potassium":"3500",
            "Phosphorus":"1000",
            "Calcium":{"female":"1000","male":"800"},
            "Fluid":"2000",
            "Steps":{"female":"15500","male":"17000"},
          }];
          $scope.stage1Json = JSon1[0];
          // console.log($scope.stage1Json)

          var JSon2 = [{
            "Sodium":"2200",
            "Potassium":"3500",
            "Phosphorus":"1000",
            "Calcium":{"female":"1000","male":"800"},
            "Fluid":"1800",
            "Steps":{"female":"10000","male":"13000"},
          }];
          $scope.stage2Json = JSon2[0];
          // console.log($scope.stage2Json)

          var JSon3 = [{
            "Sodium":"2000",
            "Potassium":"2500",
            "Phosphorus":"1000",
            "Calcium":{"female":"1000","male":"800"},
            "Fluid":"1500",
            "Steps":{"female":"7500","male":"10500"},
          }];
          $scope.stage3Json = JSon3[0];
          // console.log($scope.stage3Json)

          var JSon4 = [{
            "Sodium":"1800",
            "Potassium":"2000",
            "Phosphorus":"700",
            "Calcium":{"female":"1000","male":"800"},
            "Fluid":"1200",
            "Steps":{"female":"6000","male":"9000"},
          }];
          $scope.stage4Json = JSon4[0];
          // console.log($scope.stage4Json)

          var JSon5 = [{
            "Sodium":"1000",
            "Potassium":"2000",
            "Phosphorus":"600",
            "Calcium":{"female":"1000","male":"800"},
            "Fluid":"950",
            "Steps":{"female":"5000","male":"7500"},
          }];
          $scope.stage5Json = JSon5[0];
          // console.log($scope.stage5Json)





      $scope.lbs_to_kg = function(u){
        var n = u/2.2;
        return n.toFixed(2);
      };




      $scope.feet_to_cm = function(feet,inch){
            var pf = feet
            var pi = inch
       
             var m = (pf * 12) + pi; //in inch
             var u = m * 2.54 ;
            //  var m = (pf * 30.48) + pi;
            //  return m;
            return u.toFixed(2);

      };



///////////// Daily Calerise Count ===
      $scope.total_daily_cal_count = function(type,weight,height,age){
        // console.log(type +" "+ weight+" "+height+" "+age)
        var pw = parseInt(weight)
        var ph = parseInt(height)
        var pa = parseInt(age)

        var s = weight * 31;
        return s.toFixed(0);

          // if(type == 1){ //For male ...
          //     var q = 66.47 + ( 13.75 * pw ) + ( 5.0 * ph ) - ( 6.75 * pa);
          //     return q.toFixed(0);
          // }else if(type == 0){  //For female ...
          //    var r = 665.09 + ( 9.56 * pw ) + ( 1.84 * ph ) - ( 4.67 * pa );
          //    //console.log(r)
          //    return r.toFixed(0);
          // }

      }; 


     //console.log($scope.total_daily_cal_count(1,55,175,21));       //if it gives ans 1555.97 then true..
    //  console.log($scope.total_daily_cal_count(0,48,165.1,36));   //Women (0,48,26,36)  //if it gives ans 1004 then true..





/////////// Daily  Fat Count ===

  $scope.total_daily_fat_count = function(totcal){
// console.log(totcal)

      var p = (totcal * 0.25)/9
      return p.toFixed(0);
      // var A = totcal * 0.20 //Total Daily Fat in Grams 
      // var B = totcal * 0.30

      // var fat = ( A + B )/2;

      // return fat.toFixed(0);
  };
// console.log($scope.total_daily_fat_count(1,1200));





/////////// Daily  Daily Protein Count ===

  $scope.total_daily_protein_count = function(tot_body_weight,kidnystage,comorbid){ //bodyweight in Pound(lbs)
    var m = tot_body_weight/2.2;
    var bdyw  = m.toFixed(2);
    // console.log(kidnystage+" "+comorbid+" "+bdyw)
   
    // console.log("Is Diabites : "+comorbid.Diabetes)
         
              if(comorbid.Diabetes == true && (kidnystage == "Stage 1" || kidnystage == "Stage 2") ){
                var p = bdyw * 0.8;
                //console.log(0.8)
                return p.toFixed(0);
              }else if(comorbid.Diabetes == true && (kidnystage == "Stage 3" || kidnystage == "Stage 4")){
                var q = bdyw * 0.6;
                //console.log(0.6)
                return q.toFixed(0);
              }else if(comorbid.Diabetes == true && kidnystage == "Stage 5/ESRD"){
                var q = bdyw * 1.4;
                //console.log(1.4)
                return q.toFixed(0);
              }else if(comorbid.Diabetes == false || comorbid.Diabetes == undefined){
                  if(kidnystage == "Stage 1" || kidnystage == "Stage 2"){
                    var r = bdyw * 1.8;
                    //console.log(1.8)
                    return r.toFixed(0);
                  }else if(kidnystage == "Stage 3" || kidnystage == "Stage 4"){
                    var s = bdyw * 0.75;
                    //console.log(0.75)
                    return s.toFixed(0);
                  }else if(kidnystage == "Stage 5/ESRD"){
                    var t = bdyw * 1.4;
                    //console.log(1.4)
                    return t.toFixed(0);
                  }
              }
         
      // var protein = (tot_body_weight/2.2) * 1.8;
      // var t = ((tot_body_weight/2.2) * 1.8).toFixed(2);
      // return ((tot_body_weight/2.2) * 1.8).toFixed(0);
      
  };
  // console.log($scope.total_daily_protein_count(121));



    $scope.convert_to_per = function(u){
        return (u * 100).toFixed(0)
    };





  $scope.myfatpercent = function(fat,cal){
     return (((fat * 4)/cal)*100).toFixed(0);
  };
  $scope.myproteinpercent = function(pro,cal){
     return (((pro * 4)/cal)*100).toFixed(0);
  };









$scope.UploadImageToFireBase = function(filepath,type,uid){
  
   var file = filepath
   
   var timestamp = new Date().getTime();

   if(type == 'profile'){
      $scope.childpath = 'Userimages/'+ uid + '.jpg'
      $scope.imgname = uid + '.jpg'
   }else if(type == 'blog'){
      $scope.childpath = 'Blog/'+ uid +'|'+ timestamp + '.jpg'
      $scope.imgname = uid +'|'+ timestamp + '.jpg'
   }


    var storageRef = firebase.storage().ref();

    var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, $scope.imgname));
        });
    };

    getFileObject(file, function(fileObject) {
        var uploadTask = storageRef.child($scope.childpath).put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
            console.log(snapshot);
        }, function(error) {
            console.log(error);
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            localStorage.setItem('userProfileImage',downloadURL)
            // handle image here
        });
    });
};



// ================ Network =============
document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()

    console.log(type+" "+isOnline+" "+isOffline)
    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      console.log(networkState)
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;
      console.log(networkState)
    })

  }, false);










});
