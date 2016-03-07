app.controller('AdminClientsCtrl', ['$scope', '$http',
  '$location', 'clientDetailService', 'store', function($scope, $http,
  $location, clientDetailService, store) {
  //Returns an array of all records in the clients collection
  $scope.rowCollection = [];
  $scope.clientArray = clientDetailService.data;
  $scope.data = [].concat($scope.rowCollection);
  $scope.seeFullClient = function(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      console.log(row);
    }
  };
  $http.get('api/clients/all').then(function(res) {
    $scope.rowCollection = res.data;
    $scope.data = [].concat($scope.rowCollection);
  }, function(err) {
    console.log(err.message);
  }
    );
  $scope.clientDetail = function(id) {
    $location.path('/admin/clients/details');
    for(var i = 0; i < $scope.data.length; i++) {
      if($scope.data[i]._id === id) {
        clientDetailService.data = $scope.data[i];
      }
    }
  };
  $scope.editClient = function(data) {
    $http({
      method: 'PUT',
      url: 'api/clients/edit',
      data: data
    }).then(function successCallback(res) {
      console.log(res);
      alert('Client Successfully Updated');
    }, function errorCallback(res) {
      console.log(res);
    });
  };
  $scope.deleteClient = function(data) {
    var confirmation = confirm('Delete this client?');
    if(confirmation) {
      $http({
        method: 'DELETE',
        url: 'api/clients/' + data
      }).then(function successCallback(res) {
        console.log(res.data);
        $location.path('/admin/clients');
      }, function errorCallback(res) {
        console.log(res);
      });
    }
  };
}]);
