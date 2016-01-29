app.controller('LoginController', ['$scope', 'auth', 'store',
'$location', function($scope, auth, store, $location) {
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/home');   //This is what shows up after login
    }, function(error) {
      console.log('There was an error logging in', error);
    });
  };
}]);
