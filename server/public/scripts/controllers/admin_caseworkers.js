app.controller('AdminCaseworkersCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {
    $scope.rowCollection = [];
    $scope.data = [].concat($scope.rowCollection);

    $http.get('api/caseworkers').then(function(res) {
      console.log(res);
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
      console.log($scope.rowCollection);
    }, function(err) {
      console.log(err.message);
    });

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

    var createAccount = function (email) {
      var cwEmail = {email: email};
      $http({
        method: 'POST',
        url: '/api/jauth/caseworker',
        data: cwEmail
      }).then(function successCallback(response) {

      }, function errorCallback(response) {
        console.log(response);
      });
    };
  };
}]);
