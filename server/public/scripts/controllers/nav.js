app.controller('NavController', ['$scope', '$http', 'auth', 'store',
'$location', function($scope, $http, auth, store, $location) {
  $scope.logout = function() {
    alert('loged out');
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  };
}]);
