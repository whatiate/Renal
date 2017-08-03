var app = angular.module('whatiate');

app.controller('searchCtrl', function($ionicLoading, $ionicPopup, $log, $scope, $state, $timeout, AuthService, $http,nutritionixApi,UtilService,$window) {

    $("#searchbtns").click(function(){
        // $("p").hide();
        console.log("clicked")
         
        
    });
   
    // $ionicLoading.show();
    //  $http.get("https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&format=json&api_key=zrIKDQYKRhWgaL2JqLBYgelmw3MGwBzdl604zPot").then(function(res){
    //         console.log(res.data);
    //         $ionicLoading.hide();
    //        $scope.searchData = res.data.foods;

    //       });

    // $("#tempshow").hide();

    $scope.viewItem = function(nutrients){
        $scope.nutrientsJson = [];
        var prod_name = {"Proname":nutrients.item_name}
        $scope.nutrientsJson.push(prod_name);
        console.log(nutrients)
        if(nutrients.nf_total_carbohydrate != null){
          var Nutr_single = {"name":"Carbohydrate, by difference","value":nutrients.nf_total_carbohydrate}
          // var Nutr_single = {"Carbohydrate, by difference":nutrients.nf_total_carbohydrate};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_total_fat != null){
          var Nutr_single = {"name":"Total lipid (fat)","value":nutrients.nf_total_fat}
          // var Nutr_single = {"Total lipid (fat)":nutrients.nf_total_fat};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_protein != null){
          var Nutr_single = {"name":"Protein","value":nutrients.nf_protein}
          // var Nutr_single = {"Protein":nutrients.nf_protein};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_calcium_dv != null){
          var Nutr_single = {"name":"Calcium, Ca","value":nutrients.nf_calcium_dv}
          // var Nutr_single = {"Calcium, Ca":nutrients.nf_calcium_dv};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_sodium != null){
          var Nutr_single = {"name":"Sodium, Na","value":nutrients.nf_sodium}
          // var Nutr_single = {"Sodium, Na":nutrients.nf_sodium};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_calories != null){
          var Nutr_single = {"name":"Energy","value":nutrients.nf_calories}
          // var Nutr_single = {"Energy":nutrients.nf_calories};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_water_grams != null){
          var Nutr_single = {"name":"Water","value":nutrients.nf_water_grams}
          // var Nutr_single = {"Water":nutrients.nf_water_grams};
          $scope.nutrientsJson.push(Nutr_single);
        }
        if(nutrients.nf_potassium != null){
          var Nutr_single = {"name":"Potassium, K","value":nutrients.nf_potassium}
          // var Nutr_single = {"Potassium, K":nutrients.nf_potassium};
          $scope.nutrientsJson.push(Nutr_single);
        }
       

        console.log($scope.nutrientsJson)
        localStorage.setItem("ItemData",JSON.stringify($scope.nutrientsJson))
        $state.go('pointsresults');
    };

    // $scope.viewItem = function(name,group,nutrients){
    //     $scope.nutrientsJson = [];
    //     console.log(name)
    //     console.log(group)
    //     var prod_name = {"Proname":name}
    //     var group_name = {"group":group}
    //     $scope.nutrientsJson.push(prod_name);
    //     $scope.nutrientsJson.push(group_name);
    //     // console.log(nutrients)
    //     $state.go('pointsresults');
    //     for (var i = 0; i < nutrients.length; i++) {
    //         if(nutrients[i].name == "Protein" || nutrients[i].name == "Total lipid (fat)" || nutrients[i].name == "Calcium, Ca" || nutrients[i].name == "Sodium, Na" || nutrients[i].name == "Potassium, K" || nutrients[i].name == "Water" || nutrients[i].name == "Carbohydrate, by difference" || nutrients[i].name == "Phosphorus, P" || (nutrients[i].name == "Energy" && nutrients[i].unit == "kcal")){
    //             // console.log(nutrients[i].name+" "+nutrients[i].value);
    //             var Nutr_single = {"name":nutrients[i].name,"value":nutrients[i].value,"unit":nutrients[i].unit}
    //             $scope.nutrientsJson.push(Nutr_single);
                
                
    //         }   
    //     }
        
    //     localStorage.setItem("ItemData",JSON.stringify($scope.nutrientsJson))
       
    // };


    $scope.filter_for_nutrients = function(str,value,unit){
        if(str.includes("Protein")){return "Protein : "+value+" "+unit;}
        else if(str.includes("lipid")){return "Fat : "+value+" "+unit;}
        else if(str.includes("Calcium")){return "Calcium : "+value+" "+unit;}
        else if(str.includes("Sodium")){return "Sodium : "+value+" "+unit;}
        else if(str.includes("Water")){return "Water : "+value+" "+unit;}
        else if(str.includes("Potassium")){return "Potassium : "+value+" "+unit;}
        else if(str.includes("Energy") && unit.includes("kcal")){return "Energy : "+value+" "+unit;}
   };

// Carbohydrate, by difference

    $scope.firstcharacter = function(str){
        // return str.charAt(0);
        $rootScope.alphabtchar = str.charAt(0);
        
    };

// ===========================================================================================================

    $scope.searchFoodFormData = {
      text: 'Coca-cola',
      format: 'text'
    };

    $scope.searchFoodResults = null;

    $scope.search = function(form) {
      if (!form.$valid) return;

      $ionicLoading.show();

      var URL = '';
      var keyValObject = {
        '[APPID]': nutritionixApi.credentials.appId,
        '[APPKEY]': nutritionixApi.credentials.appKey
      };
      if ('text' === $scope.searchFoodFormData.format) {
        keyValObject['[TEXT]'] = $scope.searchFoodFormData.text;
        keyValObject['[FIELDS]'] = _.join(nutritionixApi.text.fields, ',');
        URL = UtilService.createURLstring(nutritionixApi.text.url, keyValObject);
        console.log(URL)
      } else {
        keyValObject['[BARCODE]'] = $scope.searchFoodFormData.text;
        URL = UtilService.createURLstring(nutritionixApi.barcode.url, keyValObject);
        console.log(URL)
      }

      $http({
          method: 'GET',
          url: URL
        })
        .then(function successCallback(response) {
        //   $log.info(response);
        console.log(response)
          if ('text' === $scope.searchFoodFormData.format) {
            $scope.searchFoodResults = response.data.hits;
          } else {
            var tempObj = [{ _id: response.data.item_id, fields: response.data }];
            $scope.searchFoodResults = tempObj;
          }
        })
        .catch(function errorCallback(error) {
          $log.error(error);
          $scope.searchFoodResults = [];
        })
        .finally(function() {
          $ionicLoading.hide();
          $scope.searchFoodFormData.format = 'text';
        });
    };

// -------------- BarCode ----------------
$scope.readBarCode = function(form) {
      if (!$window.cordova) return;

      UtilService.readBarCode()
        .then(function(barcodeData) {
          console.log(barcodeData);
          $scope.searchFoodFormData.text = barcodeData.text;
          $scope.searchFoodFormData.format = barcodeData.format;
          $scope.search(form);
        })
        .catch(function(error) {
          $log.error(error);
        });
    };




});
