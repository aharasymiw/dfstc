app.controller('AdminClientsCtrl', ['$scope', '$http',
  '$location', 'store', function($scope, $http, $location, store) {
  //Returns an array of all records in the clients collection
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);
  $scope.seeFullClient = function(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      console.log(row);
    }
  };
  $scope.clientDetail = function(id) {
    $location.path('/details');
  };
  $http.get('api/clients/all').then(function(res) {
    $scope.rowCollection = res.data;
    $scope.data = [].concat($scope.rowCollection);
  }, function(err) {console.log(err.message);}
  );
}]);
