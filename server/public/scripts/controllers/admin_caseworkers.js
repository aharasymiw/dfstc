app.controller('AdminCaseworkersCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  $scope.getTableData = function() {
    $http.get('api/caseworkers').then(function(res) {
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
    }, function(err) {
      console.log(err.message);
    });
  };

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
    }, function errorCallback(response) {
      alert('Caseworker Not Saved: ' + response.statusText);
      console.log('caseworkers response: ', response.data.errmsg);
    });
  };

  $scope.submit = function() {
      $http({
        method: 'POST',
        url: '/api/jauth/caseworker',
        data: $scope.form
      }).then(function successCallback(response) {
        createCaseworker();
      }, function errorCallback(response) {
        alert('Caseworker Not Saved: ' + response.statusText);
        console.log('jauth response: ', response.data.errmsg);
      });
    };

  $scope.getTableData();

  $scope.removeItem = function removeItem(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      $scope.rowCollection.splice(index, 1);
    }
    console.log(row._id);
  };

}]);
