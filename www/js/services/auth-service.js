var app = angular.module('whatiate');

app.service('AuthService', function($ionicHistory, $firebaseAuth, $firebaseArray, $firebaseObject, $log, $state, firebaseUrl) {

  var self = this;

  self.user = null;

  self.ref = firebase.database().ref();
  // self.ref = new Firebase(firebaseUrl);
  self.usersRef = self.ref.child('users');
  self.usersArray = $firebaseArray(self.usersRef);
  self.usersAuth = $firebaseAuth();

  self.createAccount = function(emailAndPassword) {
    console.log(emailAndPassword);
    return self.usersAuth.$createUser({
      email: emailAndPassword.email,
      password: emailAndPassword.password
    });
  };

  self.loginWithEmailAndPassword = function(emailAndPassword) {
    return self.usersAuth.$authWithPassword({
      email: emailAndPassword.email,
      password: emailAndPassword.password
    });
  };

  self.thirdPartyLogin = function(provider) {
    $log.info('AuthService::login with ', provider);
    self.usersAuth.$authWithOAuthRedirect(provider, { scope: "email" })
      .then(function(authData) {
        // User successfully logged in
      })
      .catch(function(error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          self.usersAuth.$authWithOAuthPopup(provider)
            .then(function(authData) {
              // User successfully logged in. We can log to the console since we’re using a popup here
              $log.info(authData);
            });
        } else {
          // Another error occurred
          $log.error(error);
        }
      });
  };

  self.logout = function() {
    self.usersAuth.$unauth();
    self.user = null;
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $log.info("Logged out");
    $state.go('login');
    return;
  };

  self.setUser = function(user) {
    self.user = {
      uid: user.uid,
      displayName: user[user.provider].displayName ? user[user.provider].displayName : null,
      email: user[user.provider].email ? user[user.provider].email : null,
      profileImageURL: user[user.provider].profileImageURL ? user[user.provider].profileImageURL : null
    };
    self.usersRef.child(user.uid).set(self.user);
  };

  self.getUserById = function(id) {
    return $firebaseObject(self.ref.child('users').child(id));
  };

  return self;

});









