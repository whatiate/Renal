var app = angular.module('whatiate');

app.controller('pointsresultsCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService,$rootScope) {

$scope.nutreinfo = true;
$scope.foodinfo = false;

    $scope.show_nutrient_info  =function(){
        $scope.foodinfo = false;
        $scope.nutreinfo = true;
    };
    $scope.show_food_info  =function(){
        $scope.nutreinfo = false;
        $scope.foodinfo = true;
    };

    $scope.$on('$ionicView.enter', function(){
        
            $scope.ItemDetails = JSON.parse(localStorage.getItem("ItemData"));
            console.log($scope.ItemDetails);
            // console.log($scope.ItemDetails[0].Proname);
            $scope.MyProduct_name = $scope.ItemDetails[0].Proname
            $scope.MyGroup_name = $scope.ItemDetails[1].group

            if($scope.ItemDetails != null || $scope.ItemDetails !='' || $scope.ItemDetails.length>0){

//Default values==========
                $scope.MyProduct_Carbohydrates_value = 0;
                $scope.MyProduct_sodium_value = 0;
                $scope.MyProduct_Phosphorus_value = 0;
                $scope.MyProduct_Potassium_value = 0;
                $scope.MyProduct_Fluids_value = 0;
                $scope.MyProduct_Carbohydrates = "Carbohydrates";
                $scope.MyProduct_Phosphorus = "Phosphorus";
                $scope.MyProduct_Potassium = "Potassium";
                $scope.MyProduct_Fluids = "Fluids";
                $scope.warningSodium = "Very Low Sodium";
                $scope.Sodiumcolor = "color: #0f6c2a;";
                $scope.warningPhosphorus = "Very Low Phosphorus";
                $scope.Phosphoruscolor = "color: #0f6c2a;";
                $scope.warningPotassium = "Very Low Potassium";
                $scope.Potassiumcolor = "color: #0f6c2a;";
//#Default values==========
                for (var i = 0; i < $scope.ItemDetails.length; i++) {

                    if($scope.ItemDetails[i].name == "Energy"){
                        $scope.MyProduct_energy = "Kcal";
                        $scope.MyProduct_energy_value = $scope.ItemDetails[i].value;
                        // $scope.gramTomiligram($scope.ItemDetails[i].unit,$scope.ItemDetails[i].value);
                    }
                    else if($scope.ItemDetails[i].name == "Protein")
                    {
                        $scope.MyProduct_protein = "Protein";
                        $scope.MyProduct_protein_value = $scope.ItemDetails[i].value*1000; //converted in milligram
                    }
                    else if($scope.ItemDetails[i].name == "Total lipid (fat)")
                    {
                        $scope.MyProduct_fat = "fat";
                        $scope.MyProduct_fat_value = $scope.ItemDetails[i].value;
                    }
                    else if($scope.ItemDetails[i].name == "Calcium, Ca")
                    {
                        $scope.MyProduct_calcium = "calcium";
                        $scope.MyProduct_calcium_value = $scope.ItemDetails[i].value;
                    }
                    else if($scope.ItemDetails[i].name == "Sodium, Na")
                    {   
                        $scope.MyProduct_sodium = "sodium";
                        $scope.MyProduct_sodium_value = $scope.ItemDetails[i].value;
                        // console.log(" Sodium " + $scope.MyProduct_sodium_value + " MG")
                        if($scope.MyProduct_sodium_value <= 35){
                            // console.log("Very Low Sodium");
                            $scope.warningSodium = "Very Low Sodium";
                            $scope.Sodiumcolor = "color: #0f6c2a;";
                        }else if(36<=$scope.MyProduct_sodium_value && $scope.MyProduct_sodium_value<=140){
                            // console.log("Low Sodium");
                            $scope.warningSodium = "Low Sodium";
                            $scope.Sodiumcolor = "color: #0f6c2a;";
                        }else if($scope.MyProduct_sodium_value>=141){
                            // console.log("High Sodium");
                            $scope.warningSodium = "High Sodium";
                            $scope.Sodiumcolor = "color: #ed1c24;";
                        }
                    }
                    else if($scope.ItemDetails[i].name == "Carbohydrate, by difference")
                    {   
                        $scope.MyProduct_Carbohydrates = "Carbohydrates";
                        $scope.MyProduct_Carbohydrates_value = $scope.ItemDetails[i].value*1000; //converted in milligram
                        $scope.MyProduct_Carbohydrates_value = $scope.MyProduct_Carbohydrates_value.toFixed(0)
                        // console.log($scope.MyProduct_Carbohydrates_value)
                        
                    }
                    else if($scope.ItemDetails[i].name == "Water")
                    {   
                        $scope.MyProduct_Fluids = "Fluids";
                        $scope.MyProduct_Fluids_value = $scope.ItemDetails[i].value*1000; //converted in milligram
                        $scope.MyProduct_Fluids_value = $scope.MyProduct_Fluids_value.toFixed(0)
                        // console.log($scope.MyProduct_Fluids_value)
                    }
                    else if($scope.ItemDetails[i].name == "Phosphorus, P")
                    {   
                        $scope.MyProduct_Phosphorus = "Phosphorus";
                        $scope.MyProduct_Phosphorus_value = $scope.ItemDetails[i].value;
                        // console.log("Phosphorus "+$scope.MyProduct_Phosphorus_value+" MG")
                        if($scope.MyProduct_Phosphorus_value<=50){
                            // console.log("Very Low Phosphorus");
                            $scope.warningPhosphorus = "Very Low Phosphorus";
                            $scope.Phosphoruscolor = "color: #0f6c2a;";
                        }else if(51<=$scope.MyProduct_Phosphorus_value && $scope.MyProduct_Phosphorus_value<=150){
                            // console.log("Low Phosphorus");
                            $scope.warningPhosphorus = "Low Phosphorus";
                            $scope.Phosphoruscolor = "color: #0f6c2a;";
                        }else if($scope.MyProduct_Phosphorus_value>=151){
                            // console.log("High Phosphorus");
                            $scope.warningPhosphorus = "High Phosphorus";
                            $scope.Phosphoruscolor = "color: #ed1c24;";
                        }
                    }
                    else if($scope.ItemDetails[i].name == "Potassium, K")
                    {   
                        $scope.MyProduct_Potassium = "Potassium";
                        $scope.MyProduct_Potassium_value = $scope.ItemDetails[i].value;
                        // console.log("Potassium "+$scope.MyProduct_Potassium_value+" MG")
                        if($scope.MyProduct_Potassium_value<=100){
                            // console.log("Very Low Potassium");
                            $scope.warningPotassium = "Very Low Potassium";
                             $scope.Potassiumcolor = "color: #0f6c2a;";
                        }else if(101<=$scope.MyProduct_Potassium_value && $scope.MyProduct_Potassium_value<=200){
                            // console.log("Low Potassium");
                            $scope.warningPotassium = "Low Potassium";
                             $scope.Potassiumcolor = "color: #0f6c2a;";
                        }else if(201<=$scope.MyProduct_Potassium_value && $scope.MyProduct_Potassium_value<=300){
                            // console.log("High Potassium");
                            $scope.warningPotassium = "High Potassium";
                             $scope.Potassiumcolor = "color: #ed1c24;";
                        }else if($scope.MyProduct_Potassium_value>=301){
                            // console.log("Very High Potassium");
                            $scope.warningPotassium = "Very High Potassium";
                             $scope.Potassiumcolor = "color: #ed1c24;";
                        }
                    }
                   

                }

            }



        });


        // $scope.gramTomiligram = function(unit,value){
        //     console.log(unit);
        //     console.log(value);
        //     if(unit == "g"){
        //        var valueInMilligram = value*1000;
        //         return valueInMilligram;
        //     }else{
        //         return value;
        //     }
        // };


// $scope.foodArray = [];

$scope.Add_to_journal = function(){
   

    // console.log($scope.MyProduct_name)
    // console.log($scope.MyGroup_name)
    // console.log($scope.MyProduct_energy+" "+$scope.MyProduct_energy_value);
    // console.log($scope.MyProduct_protein+" "+$scope.MyProduct_protein_value);
    // console.log($scope.MyProduct_fat+""+$scope.MyProduct_fat_value);
    // console.log($scope.MyProduct_calcium+" "+$scope.MyProduct_calcium_value);
    // console.log($scope.MyProduct_sodium+" "+$scope.MyProduct_sodium_value);
    // console.log($scope.MyProduct_Carbohydrates+" "+$scope.MyProduct_Carbohydrates_value);
    // console.log($scope.MyProduct_Fluids+" "+$scope.MyProduct_Fluids_value);
    // console.log($scope.MyProduct_Phosphorus+" "+$scope.MyProduct_Phosphorus_value);
    // console.log($scope.MyProduct_Potassium+" "+$scope.MyProduct_Potassium_value);

var foodArray = {
                "productgroup":$scope.MyGroup_name,
                "productname":$scope.MyProduct_name,
                "energy":$scope.MyProduct_energy,
                "energy_value":$scope.MyProduct_energy_value,
                "protein":$scope.MyProduct_protein,
                "protein_value":$scope.MyProduct_protein_value,
                "fat":$scope.MyProduct_fat,
                "fat_value":$scope.MyProduct_fat_value,
                "calcium":$scope.MyProduct_calcium,
                "calcium_value":$scope.MyProduct_calcium_value,
                "sodium":$scope.MyProduct_sodium,
                "sodium_value":$scope.MyProduct_sodium_value,
                "carbohydrates":$scope.MyProduct_Carbohydrates,
                "carbohydrates_value":$scope.MyProduct_Carbohydrates_value,
                "fluids":$scope.MyProduct_Fluids,
                "fluids_value":$scope.MyProduct_Fluids_value,
                "phosphorus":$scope.MyProduct_Phosphorus,
                "phosphorus_value":$scope.MyProduct_Phosphorus_value,
                "potassium":$scope.MyProduct_Potassium,
                "potassium_value":$scope.MyProduct_Potassium_value,
                };
// console.log($scope.foodArray)
          
            
            if(JSON.parse(localStorage.getItem("myJuornalData")) == null){
                console.log("emapaty")
                var temparry = []
                temparry.push(foodArray);
                localStorage.setItem("myJuornalData",JSON.stringify(temparry))
                $rootScope.Toast("Food added to your journal successfully");
            }else{
                var alljournaldata = JSON.parse(localStorage.getItem("myJuornalData"));
                console.log(alljournaldata)
                alljournaldata.push(foodArray)
                console.log(alljournaldata)
                localStorage.setItem("myJuornalData",JSON.stringify(alljournaldata))
                $rootScope.Toast("Food added to your journal successfully");
            }




    // $scope.foodArray = [
    //     {"productgroup":$scope.MyGroup_name},
    //     {"productname":$scope.MyProduct_name},
    //     {"energy":$scope.MyProduct_energy,"value":""+$scope.MyProduct_energy_value},
    //     {"protein":$scope.MyProduct_protein,"value":""+$scope.MyProduct_protein_value},
    //     {"fat":$scope.MyProduct_fat,"value":""+$scope.MyProduct_fat_value},
    //     {"calcium":$scope.MyProduct_calcium,"value":""+$scope.MyProduct_calcium_value},
    //     {"sodium":$scope.MyProduct_sodium,"value":""+$scope.MyProduct_sodium_value},
    //     {"carbohydrates":$scope.MyProduct_Carbohydrates,"value":""+$scope.MyProduct_Carbohydrates_value},
    //     {"fluids":$scope.MyProduct_Fluids,"value":""+$scope.MyProduct_Fluids_value},
    //     {"phosphorus":$scope.MyProduct_Phosphorus,"value":""+$scope.MyProduct_Phosphorus_value},
    //     {"potassium":$scope.MyProduct_Potassium,"value":""+$scope.MyProduct_Potassium_value},
    // ];
    // console.log($scope.foodArray);

};



});





