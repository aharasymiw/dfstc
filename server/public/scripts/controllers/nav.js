app.controller('NavCtrl', ['$scope', '$http', 'store',
'$location', function($scope, $http, store, $location) {
  $scope.logout = function() {
    alert('loged out');
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  };
}]);
