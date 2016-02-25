app.controller('AdminClientsCtrl', ['$scope', '$http',
  '$location', 'clientDetailService', 'store', function($scope, $http, $location, clientDetailService, store) {
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
  }, function(err) {console.log(err.message);}
  );
  $scope.clientDetail = function(id) {
    $location.path('/admin/clients/details');
    for(var i = 0; i < $scope.data.length; i++) {
      if($scope.data[i]._id === id){
        clientDetailService.data = $scope.data[i];
      }
    }
  };
  $scope.deleteClient = function(data) {
    $http({
      method: 'DELETE',
      url: 'api/clients/' + data
    }).then(function successCallback(res) {
        $location.path('/admin/clients');
    }, function errorCallback(res) {
      console.log(res);
    });
  }
}]);
