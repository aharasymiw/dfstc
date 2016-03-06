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
      alert('New Caseworker Saved!');
      $scope.getTableData();
      formReset();
    }, function errorCallback(err) {
      alert('Error, Caseworker Not Saved: ' + err.statusText);
      console.log('Caseworker Response: ', err.data.errmsg);
    });
  };

  var deleteCaseworker = function(id) {
    $http({
      method: 'DELETE',
      url: '/api/caseworkers/' + id
    }).then(function successCallback(res) {
      $scope.getTableData();
    }, function errorCallback(err) {
      alert('Error, Caseworker Not Deleted: ' + err.statusText);
      console.log('Caseworker Response: ', err.data.errmsg);
    });
  };

  $scope.getTableData = function() {
    $http.get('api/caseworkers').then(function(res) {
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
    }, function(err) {
      alert('Error, Can not get Caseworkers: ' + err.statusText);
      console.log('jauth response: ', err.data.errmsg);
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
        alert('Error, Caseworker Not Saved: ' + err.statusText);
        console.log('Jauth Response: ', err.data.errmsg);
      });
    };

  $scope.removeItem = function(row) {
    $http({
      method: 'DELETE',
      url: '/api/jauth/caseworker/' + row.cwEmail + '/' + row._id
    }).then(function successCallback(res) {
      deleteCaseworker(res.data);
    }, function errorCallback(err) {
      alert('Error, Caseworker Not Deleted: ' + err.statusText);
      console.log('Jauth Response: ', err.message);
    });
  };

  $scope.getTableData();

}]);
