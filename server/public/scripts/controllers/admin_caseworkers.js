app.controller('AdminCaseworkersCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: '/api/caseworkers',
      data: $scope.form
    }).then(function successCallback(response) {
      createAccount($scope.form.cwEmail);
    }, function errorCallback(response) {
      console.log(response);
    });

    var createAccount = function(email) {
      $http({
        method: 'POST',
        url: '/api/jauth/caseworker',
        data: email
      }).then(function successCallback(response) {

      }, function errorCallback(response) {
        console.log(response);
      });
  };
}]);
