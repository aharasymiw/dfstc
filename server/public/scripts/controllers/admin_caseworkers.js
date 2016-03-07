app.controller('AdminCaseworkersCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  var formReset = function() {
    $scope.form.cwFirstName = '';
    $scope.form.cwLastName = '';
    $scope.form.cwEmail = '';
    $scope.form.cwOrg = '';
  };

  var createCaseworker = function() {
    $http({
      method: 'POST',
      url: '/api/caseworkers',
      data: $scope.form
    }).then(function successCallback(response) {
      $scope.getTableData();
      formReset();
    }, function errorCallback(err) {
      alert('Error, Caseworker Not Saved: ' + err.data);
    });
  };

  var deleteCaseworker = function(id) {
    $http({
      method: 'DELETE',
      url: '/api/caseworkers/' + id
    }).then(function successCallback(res) {
      $scope.getTableData();
    }, function errorCallback(err) {
      alert('Error, Caseworker Not Deleted: ' + err.data);
    });
  };

  $scope.getTableData = function() {
    $http.get('api/caseworkers').then(function(res) {
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
    }, function(err) {
      alert('Error, Can not get Caseworkers: ' + err.data);
    });
  };

  $scope.submit = function() {
      $http({
        method: 'POST',
        url: '/api/jauth/caseworker',
        data: $scope.form
      }).then(function successCallback(response) {
        createCaseworker();
      }, function errorCallback(err) {
        alert('Error, Caseworker Not Saved: ' + err.data);
      });
    };

  $scope.removeItem = function(row) {
    $http({
      method: 'DELETE',
      url: '/api/jauth/caseworker/' + row.cwEmail + '/' + row._id
    }).then(function successCallback(res) {
      deleteCaseworker(res.data);
    }, function errorCallback(err) {
      alert('Error, Caseworker Not Deleted: ' + err.data);
    });
  };

  $scope.getTableData();

}]);
