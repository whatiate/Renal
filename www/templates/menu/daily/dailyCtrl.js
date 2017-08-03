var app = angular.module('whatiate');

app.controller('dailyCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$ionicModal,$rootScope) {

    $scope.mynutrient = [
        {
            "protein":"",
            "sodium":"",
            "fat":"",
            "calcium":"",
            "phosphorus":"",
            "potassium":"",
            "fluids":""
        }
    ];

    


//========= Edit Model =========
 $ionicModal.fromTemplateUrl('templates/modals/recommendationEdit.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.Editmodal = modal;
        });

  $scope.openEditmodal = function() {
      console.log($rootScope.UserStData)
        $scope.Editmodal.show();
        $scope.mynutrient[0].protein = $scope.userRecommendedProtein;
        $scope.mynutrient[0].sodium = $rootScope.UserStData.Sodium;
        $scope.mynutrient[0].fat = $scope.userRecommendedFat;
        if($scope.UseInfo.gender == '0'){
            $scope.mynutrient[0].calcium = $rootScope.UserStData.Calcium.female;
        }else{
            $scope.mynutrient[0].calcium = $rootScope.UserStData.Calcium.male;
        }
        $scope.mynutrient[0].phosphorus = $rootScope.UserStData.Phosphorus;
        $scope.mynutrient[0].potassium = $rootScope.UserStData.Potassium;
        $scope.mynutrient[0].fluids =$rootScope.UserStData.Fluid;
        if($scope.UseInfo.gender == '0'){
            $scope.mynutrient[0].steps = $rootScope.UserStData.Steps.female;
        }else{
            $scope.mynutrient[0].steps = $rootScope.UserStData.Steps.male;
        }
      


    };

    $scope.closeEditmodal = function() {
        $scope.Editmodal.hide();
    };       
//========= #Edit Model =========

    $scope.dataAvail = function(u){
        // console.log(u)
        // console.log($rootScope.UserStData)

        $rootScope.UserStData = {
            "Sodium":u.sodium,
            "Potassium":u.potassium,
            "Phosphorus":u.phosphorus,
            "Calcium":{"female":u.calcium,"male":u.calcium},
            "Fluid":u.fluids,
            "Steps":{"female":u.steps,"male":u.steps},
          };

                var u_w = $scope.lbs_to_kg($scope.UseInfo.weight); // in kg
                var u_hight = $scope.feet_to_cm($scope.UseInfo.heightinfeets,$scope.UseInfo.heightininche); // in cms
                $scope.userRecommendedCalery = $scope.total_daily_cal_count($scope.UseInfo.gender,u_w,u_hight,$scope.UseInfo.age);
                $scope.userRecommendedFat = u.fat;
                $scope.userRecommendedProtein = u.protein;
                // debugger;
                $scope.protein_calories = $scope.userRecommendedProtein * 4 ;
                $scope.fat_calories = $scope.userRecommendedCalery * 0.25 ;
                var per_protein_calories = $scope.protein_calories / $scope.userRecommendedCalery;
                var per_fat_calories = $scope.fat_calories / $scope.userRecommendedCalery;
                var total_carbohydrates = $scope.fat_calories + $scope.protein_calories - $scope.userRecommendedCalery;
                var per_carbohydrates = Math.abs(total_carbohydrates) / $scope.userRecommendedCalery ;
                $scope.Chart_Protein = $scope.convert_to_per(per_protein_calories)
                $scope.Chart_Fat = $scope.convert_to_per(per_fat_calories)
                $scope.Chart_Carbs = $scope.convert_to_per(per_carbohydrates)
                $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
                $scope.data = [$scope.Chart_Carbs,$scope.Chart_Protein,$scope.Chart_Fat];
                $ionicLoading.hide();
                // console.log($rootScope.UserStData)
       
    };


    $scope.loadData = function(){
            firebase.database().ref().child("nutrient").child($rootScope.myUid).once("value")
            .then(function(snapshot) {
            var u = snapshot.val();
            // console.log(u)
            if(u==null){$scope.dataNotAvail();}else{$scope.dataAvail(u);}
            localStorage.setItem("my_saved_nutrient",JSON.stringify([u]));
            var k = JSON.parse(localStorage.getItem("my_saved_nutrient"));
            });
    };

    $scope.dataNotAvail = function(){
                var u_w = $scope.lbs_to_kg($scope.UseInfo.weight); // in kg
                var u_hight = $scope.feet_to_cm($scope.UseInfo.heightinfeets,$scope.UseInfo.heightininche); // in cms
                $scope.userRecommendedCalery = $scope.total_daily_cal_count($scope.UseInfo.gender,u_w,u_hight,$scope.UseInfo.age);
                $scope.userRecommendedFat = $scope.total_daily_fat_count($scope.userRecommendedCalery);
                $scope.userRecommendedProtein = $scope.total_daily_protein_count($scope.UseInfo.weight,$scope.UseInfo.kidneystage,$scope.UseInfo.morbid);
                $scope.protein_calories = $scope.userRecommendedProtein * 4 ;
                $scope.fat_calories = $scope.userRecommendedCalery * 0.25 ;
                var per_protein_calories = $scope.protein_calories / $scope.userRecommendedCalery;
                var per_fat_calories = $scope.fat_calories / $scope.userRecommendedCalery;
                var total_carbohydrates = $scope.fat_calories + $scope.protein_calories - $scope.userRecommendedCalery;
                var per_carbohydrates = Math.abs(total_carbohydrates) / $scope.userRecommendedCalery ;
                $scope.Chart_Protein = $scope.convert_to_per(per_protein_calories)
                $scope.Chart_Fat = $scope.convert_to_per(per_fat_calories)
                $scope.Chart_Carbs = $scope.convert_to_per(per_carbohydrates)
                $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
                $scope.data = [$scope.Chart_Carbs,$scope.Chart_Protein,$scope.Chart_Fat];
                $ionicLoading.hide();
                // console.log("Protein  : "+$scope.convert_to_per(per_protein_calories))
                // console.log("Fat  : "+$scope.convert_to_per(per_fat_calories))
                // console.log("Carb  : "+$scope.convert_to_per(per_carbohydrates))
    };


    $scope.$on('$ionicView.enter', function(){
        $ionicLoading.show();
            $scope.UseInfo = JSON.parse(localStorage.getItem("Userpersonalinfo"));
            $scope.loadData();
    });


    // console.log($rootScope.UserStData)
    


  




    $scope.saveNutrient = function(allnurient){
            console.log(allnurient[0]);
           var postData = {
            protein: allnurient[0].protein,
            sodium: allnurient[0].sodium,
            fat: allnurient[0].fat,
            calcium: allnurient[0].calcium,
            phosphorus: allnurient[0].phosphorus,
            potassium: allnurient[0].potassium,
            fluids: allnurient[0].fluids,
            steps: allnurient[0].steps,
        };
        
        var newPostKey = firebase.database().ref().child('nutrient').push().key;
        var updates = {};
        updates['/nutrient/' + $rootScope.myUid] = postData;
        firebase.database().ref().update(updates);
        $scope.loadData();
       
    };

            



$(function(){
	var ink, d, x, y;
	$(".ripplelink").click(function(e){
    if($(this).find(".ink").length === 0){
        $(this).prepend("<span class='ink'></span>");
    }
         
    ink = $(this).find(".ink");
    ink.removeClass("animate");
     
    if(!ink.height() && !ink.width()){
        d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({height: d, width: d});
    }
     
    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;
     
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});
});




$scope.resetData = function(){
    firebase.database().ref().child('nutrient').child($rootScope.myUid).remove()
    $scope.loadData();
    $rootScope.Toast("The system's recommendation has been set");
};






});
