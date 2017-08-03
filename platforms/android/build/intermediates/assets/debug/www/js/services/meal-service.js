var app = angular.module('whatiate');

app.service("MealService", function($firebaseArray, $log, firebaseUrl,$firebaseAuth) {
  var self = this;

  // self.ref = new Firebase(firebaseUrl);
  self.ref = firebase.database().ref();
  // self.mealsRef = new Firebase.util.Scroll(self.ref.child('meals'), 'order');
  self.mealsRef = firebase.database().ref().child('meals');
  self.mealsArray = $firebaseArray(self.mealsRef);

  self.saveMeal = function saveMeal(meal) {
    self.mealsArray.$save(meal).then(function(ref) {
      // $log.info('MealService::saveMeal():', meal.$id, ref.key() === meal.$id);
    }).catch(function(error) {
      $log.error(error);
    });
  };

  self.destroy = function() {
    self.mealsArray.$destroy();
  };

  return self;
});
