var app = angular.module('whatiate');

app.controller('overviewCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$ionicPopover,$rootScope,$cordovaImagePicker,$cordovaCamera) {

// $("#slider").roundSlider();

$scope.setSlider = function(val){
      $("#slider").roundSlider({
    handleShape: "dot",
    radius: 130,
    width: 6,
    sliderType: "range",
    value: "0,"+val,
    beforeCreate: "traceEvent",
    create: "traceEvent",
    start: "traceEvent",
    stop: "traceEvent",
    change: "traceEvent",
    drag: "traceEvent"
});
};

// var tgb = 75;
// $scope.setSlider(tgb);




$(".active_kcal").click(function(){
        $(".active_kcal").css("color", "#43b6c3")
        $(".active_carbs").css("color", "#2e2f2e")
        $(".active_protein").css("color", "#2e2f2e")
        $(".active_fat").css("color", "#2e2f2e")
        $(".active_sodium").css("color", "#2e2f2e")
        $(".active_fluids").css("color", "#2e2f2e")

        $(".active_kcal .bar_active").css("background", "#43b6c3")
        $(".active_carbs .bar_active").css("background", "#626362")
        $(".active_protein .bar_active").css("background", "#626362")
        $(".active_fat .bar_active").css("background", "#626362")
        $(".active_sodium .bar_active").css("background", "#626362")
        $(".active_fluids .bar_active").css("background", "#626362")
    });
$(".active_carbs").click(function(){
        $(".active_kcal").css("color", "#2e2f2e")
        $(".active_carbs").css("color", "#43b6c3")
        $(".active_protein").css("color", "#2e2f2e")
        $(".active_fat").css("color", "#2e2f2e")
        $(".active_sodium").css("color", "#2e2f2e")
        $(".active_fluids").css("color", "#2e2f2e")
        
        $(".active_kcal .bar_active").css("background", "#626362")
        $(".active_carbs .bar_active").css("background", "#43b6c3")
        $(".active_protein .bar_active").css("background", "#626362")
        $(".active_fat .bar_active").css("background", "#626362")
        $(".active_sodium .bar_active").css("background", "#626362")
        $(".active_fluids .bar_active").css("background", "#626362")
        
    });
$(".active_protein").click(function(){
        $(".active_kcal").css("color", "#2e2f2e")
        $(".active_carbs").css("color", "#2e2f2e")
        $(".active_protein").css("color", "#43b6c3")
        $(".active_fat").css("color", "#2e2f2e")
        $(".active_sodium").css("color", "#2e2f2e")
        $(".active_fluids").css("color", "#2e2f2e")
        
        $(".active_kcal .bar_active").css("background", "#626362")
        $(".active_carbs .bar_active").css("background", "#626362")
        $(".active_protein .bar_active").css("background", "#43b6c3")
        $(".active_fat .bar_active").css("background", "#626362")
        $(".active_sodium .bar_active").css("background", "#626362")
        $(".active_fluids .bar_active").css("background", "#626362")
       
    });
$(".active_fat").click(function(){
        $(".active_kcal").css("color", "#2e2f2e")
        $(".active_carbs").css("color", "#2e2f2e")
        $(".active_protein").css("color", "#2e2f2e")
        $(".active_fat").css("color", "#43b6c3")
        $(".active_sodium").css("color", "#2e2f2e")
        $(".active_fluids").css("color", "#2e2f2e")
        
        $(".active_kcal .bar_active").css("background", "#626362")
        $(".active_carbs .bar_active").css("background", "#626362")
        $(".active_protein .bar_active").css("background", "#626362")
        $(".active_fat .bar_active").css("background", "#43b6c3")
        $(".active_sodium .bar_active").css("background", "#626362")
        $(".active_fluids .bar_active").css("background", "#626362")

    });
$(".active_sodium").click(function(){
        $(".active_kcal").css("color", "#2e2f2e")
        $(".active_carbs").css("color", "#2e2f2e")
        $(".active_protein").css("color", "#2e2f2e")
        $(".active_fat").css("color", "#2e2f2e")
        $(".active_sodium").css("color", "#43b6c3")
        $(".active_fluids").css("color", "#2e2f2e")
        
        $(".active_kcal .bar_active").css("background", "#626362")
        $(".active_carbs .bar_active").css("background", "#626362")
        $(".active_protein .bar_active").css("background", "#626362")
        $(".active_fat .bar_active").css("background", "#626362")
        $(".active_sodium .bar_active").css("background", "#43b6c3")
        $(".active_fluids .bar_active").css("background", "#626362")
        
    });
$(".active_fluids").click(function(){
        $(".active_kcal").css("color", "#2e2f2e")
        $(".active_carbs").css("color", "#2e2f2e")
        $(".active_protein").css("color", "#2e2f2e")
        $(".active_fat").css("color", "#2e2f2e")
        $(".active_sodium").css("color", "#2e2f2e")
        $(".active_fluids").css("color", "#43b6c3")
        
        $(".active_kcal .bar_active").css("background", "#626362")
        $(".active_carbs .bar_active").css("background", "#626362")
        $(".active_protein .bar_active").css("background", "#626362")
        $(".active_fat .bar_active").css("background", "#626362")
        $(".active_sodium .bar_active").css("background", "#626362")
        $(".active_fluids .bar_active").css("background", "#43b6c3")
        
    });



var m_names = new Array("Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec");

var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
// console.log(curr_date + " " + m_names[curr_month] + " " + curr_year)
$scope.CurrentDate = curr_date + " " + m_names[curr_month] + " " + curr_year;




        $ionicPopover.fromTemplateUrl('popover/chooseDate.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            // console.log($event)
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

// ===================== Pedo Meter ======================
document.addEventListener("deviceready", function () {
    $scope.total = 0;
    var successHandler = function (pedometerData) {
        $scope.MySteps = null
        $scope.MySteps = pedometerData.numberOfSteps - $scope.total;
      
        // console.log("Number of Step : "+$scope.MySteps)
        $scope.$apply();
        $( ".overview_calery_box" ).hide();
                    if($scope.UseInfo.gender == "1"){
                        $("#slider").append( $( "<div class='overview_calery_box' style='color:#184348'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+$scope.MySteps+"<div class='for-space'></div><div style='font-size: 13px;'>Goal:"+$rootScope.UserStData.Steps.male+"</div></div>" ) );
                     }else if($scope.UseInfo.gender == "0"){
                        $("#slider").append( $( "<div class='overview_calery_box' style='color:#184348'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+$scope.MySteps+"<div class='for-space'></div><div style='font-size: 13px;'>Goal:"+$rootScope.UserStData.Steps.female+"</div></div>" ) );
                     }
        localStorage.setItem("stepCounter",$scope.MySteps)
        $scope.countBurnedCal($scope.MySteps,$scope.UseInfo.weight);
        $scope.chartIncrease($scope.MySteps)
    }
      var errorHandler = function (pedometerData) {
        console.log(pedometerData)
        console.log(pedometerData.code)
        if(pedometerData.code == 3){
            $rootScope.showD("Sorry",pedometerData.message,"Okay");
            
        }
        $scope.MySteps = 0 ;
         if($scope.UseInfo.gender == "1"){
                        $("#slider").append( $( "<div class='overview_calery_box' style='color:#184348'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+$scope.MySteps+"<div class='for-space'></div><div style='font-size: 13px;'>Goal:"+$rootScope.UserStData.Steps.male+"</div></div>" ) );
                     }else if($scope.UseInfo.gender == "0"){
                        $("#slider").append( $( "<div class='overview_calery_box' style='color:#184348'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+$scope.MySteps+"<div class='for-space'></div><div style='font-size: 13px;'>Goal:"+$rootScope.UserStData.Steps.female+"</div></div>" ) );
                     }
      };
    pedometer.startPedometerUpdates(successHandler, errorHandler);
  }, false);
// ===================== #Pedo Meter ======================

       

        // $(document).ready(function(){
        //     $("#slider .rs-tooltip").hide();
        //     $("#slider").append( $( "<div class='overview_calery_box appcolor'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+$scope.numberWithCommas($rootScope.MySteps)+"</div>" ) );
        // });


                var kuchbhi = localStorage.getItem("trackeruserState")
                setTimeout(function() { 
                    if(kuchbhi == true || kuchbhi == "true"){
                            firebase.database().ref().child("User").child($rootScope.myUid).once("value")
                            .then(function(snapshot) {
                              $scope.UserPersonalInfo = snapshot.val(); // {first:"Ada",last:"Lovelace"}
                              localStorage.setItem("Userpersonalinfo",JSON.stringify($scope.UserPersonalInfo));
                            });
                }
                }, 5000);

                


                $rootScope.openimgdialog = function(popupname) {
                        $scope.imgPopup = $ionicPopup.alert({
                            templateUrl: 'dialog/imagechooseoverview.html',
                            scope : $scope    
                        });
                };
        
        $rootScope.hideimgdialog = function(){
          $scope.imgPopup.close();
        }






$scope.PickImageFromGalleryOverview = function(){
   
           var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
                };

                $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                  console.log(results[0])
                  localStorage.setItem("OverviewImage",results[0])
                  $state.go('track')
                
                }, function(error) {
                  console.log(error);
                });
        };

        $scope.PickImageFromCameraOverview = function(){
          var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
              };

              $cordovaCamera.getPicture(options).then(function(imageURI) {
                localStorage.setItem("OverviewImage",imageURI)
                $state.go('track')
                // console.log(imageURI)
              }, function(err) {
                console.log(err)
              });

        };




// ================= Calories burned ===================
    
    $scope.countBurnedCal = function(step_coun,weight){
        $scope.Cal_burned = ((step_coun / 67) * (weight * 0.03)).toFixed(2);
        $scope.consumedCalories = ((step_coun / 67) * (weight * 0.03)).toFixed(0);
        $scope.remainingCalories = $scope.userRecommendedCalery - $scope.consumedCalories;
        // console.log($scope.Cal_burned)
        // console.log($scope.consumedCalories)
    };

    $scope.$on('$ionicView.enter', function(){
        $ionicLoading.show();
        $("#slider .rs-tooltip").hide();
         $scope.UseInfo = JSON.parse(localStorage.getItem("Userpersonalinfo"));
        setTimeout(function() { console.log($rootScope.UserStData);$scope.countBarCalculation() }, 1500);
        $scope.countJournalNut();
        var u_w = $scope.lbs_to_kg($scope.UseInfo.weight); // in kg
        var u_hight = $scope.feet_to_cm($scope.UseInfo.heightinfeets,$scope.UseInfo.heightininche); // in cms
        $scope.userRecommendedCalery = $scope.total_daily_cal_count($scope.UseInfo.gender,u_w,u_hight,$scope.UseInfo.age);
        $scope.userRecommendedFat = $scope.total_daily_fat_count($scope.userRecommendedCalery);
        $scope.userRecommendedProtein = $scope.total_daily_protein_count($scope.UseInfo.weight,$scope.UseInfo.kidneystage,$scope.UseInfo.morbid);
        // console.log($scope.userRecommendedFat+" "+$scope.userRecommendedProtein)
        //  $scope.UseInfo.gender = "2";
       
        var coun = localStorage.getItem("stepCounter");

        if(coun != null || coun !='' || coun.length > 0){
            $scope.MySteps = coun;
            $scope.chartIncrease(coun);
        }else{
            $scope.MySteps = 0;
        }
         $scope.InitialState(coun);
        // console.log(coun)
        // console.log($scope.UseInfo)
        $scope.countBurnedCal(coun,$scope.UseInfo.weight)
        
    });

// ================= #Calories burned ===================


$scope.InitialState = function(coun){
    $(document).ready(function(){
            $scope.MySteps = 0
           $scope.chartIncrease(coun)
                $("#slider .rs-tooltip").hide();
                $( ".overview_calery_box" ).hide();
                 setTimeout(function() {
                    // console.log($scope.UseInfo.gender)
                     if($scope.UseInfo.gender == "1"){
                        $("#slider").append( $( "<div class='overview_calery_box' style='color:#184348'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+coun+"<div class='for-space'></div><div style='font-size: 13px;'>Goal:"+$rootScope.UserStData.Steps.male+"</div></div>" ) );
                     }else if($scope.UseInfo.gender == "0"){
                        $("#slider").append( $( "<div class='overview_calery_box' style='color:#184348'><div><img src='img/step.png' style='height: 22px;'></div><div class='for-space'></div>"+coun+"<div class='for-space'></div><div style='font-size: 13px;'>Goal:"+$rootScope.UserStData.Steps.female+"</div></div>" ) );
                     }

                 }, 1000);
        });
};





    $scope.chartIncrease = function(current){
        // console.log(current)
       var m = (current*100)/1700;
    //    console.log(m)
       $scope.setSlider(m);
          
           
    };



$scope.countJournalNut = function(){
  $scope.journalItems = JSON.parse(localStorage.getItem("myJuornalData"))
  console.log($scope.journalItems);
  if($scope.journalItems != null){
      if($scope.journalItems.length > 0){
        $scope.journalNutrient = {"carb":null,"prot":null,"sodium":null,"fat":null,"calc":null,"fluid":null};
        for(var i=0; i<$scope.journalItems.length; i++){
            $scope.journalNutrient.carb += parseInt($scope.journalItems[i].carbohydrates_value)
            $scope.journalNutrient.prot += $scope.journalItems[i].protein_value
            $scope.journalNutrient.sodium += $scope.journalItems[i].sodium_value
            $scope.journalNutrient.fat += $scope.journalItems[i].fat_value
            $scope.journalNutrient.calc += $scope.journalItems[i].calcium_value
            $scope.journalNutrient.fluid += parseInt($scope.journalItems[i].fluids_value)
        }
        console.log($scope.journalNutrient)
      }else{
        console.log("No data in jouranal")
      }
  }  
};


$scope.fixTwo = function(num){
   var m = num.toFixed(2);
   return m
}

$scope.countBarCalculation = function()
{
    console.log($scope.journalNutrient);
    console.log($rootScope.UserStData);
    console.log($scope.UseInfo);
    if($scope.journalNutrient != undefined){
        $scope.fluidsBar = (($scope.journalNutrient.fluid * 100)/parseInt($rootScope.UserStData.Fluid)).toFixed(0);
        $scope.SodiumBar = (($scope.journalNutrient.sodium * 100)/parseInt($rootScope.UserStData.Sodium)).toFixed(0);
        if($scope.UseInfo.gender == "0"){
            $scope.calciumBar = (($scope.journalNutrient.calc * 100)/parseInt($rootScope.UserStData.Calcium.female)).toFixed(0);
        }else if($scope.UseInfo.gender == "1"){ 
            $scope.calciumBar = (($scope.journalNutrient.calc * 100)/parseInt($rootScope.UserStData.Calcium.male)).toFixed(0);
        }
        $scope.FatBar = (($scope.journalNutrient.fat * 100)/parseInt($scope.userRecommendedFat)).toFixed(0);
        $scope.proteinBar = ((($scope.journalNutrient.prot/1000) * 100)/parseInt($scope.userRecommendedProtein)).toFixed(0);
    
        console.log("Fluids  "+$scope.fluidsBar)
        console.log("Sodium  "+$scope.SodiumBar)
        console.log("calcium "+$scope.calciumBar)
        console.log("Fat "+$scope.FatBar)
        console.log("Protein "+$scope.proteinBar)
        $ionicLoading.hide();
    }else{
         $ionicLoading.hide();
         $scope.fluidsBar = 0
         $scope.SodiumBar = 0
         $scope.calciumBar = 0
         $scope.FatBar = 0
         $scope.proteinBar = 0
         $scope.journalNutrient={"fluid":0,"sodium":0,"calc":0,"fat":0,"prot":0}
        $rootScope.Toast("Your Journal is Currently Empty");
    }   
    

    
}




});
