app.controller('HomeCtrl', ['$scope', '$http',
'store', 'authService', '$location', function($scope, $http, store, authService, $location) {
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: '/login',
      data: $scope.form
    }).then(function successCallback(response) {
      authService.saveToken(response.data);

      // redirect to projects page
      $location.path('/form');

    }, function errorCallback(response) {
      console.log(response);
    });
  };
}]);
