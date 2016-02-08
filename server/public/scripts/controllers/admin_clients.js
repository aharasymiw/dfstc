app.controller('AdminClientsCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {

  //Returns an array of all records in the clients collection
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);
  $scope.seeFullClient = function(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      console.log(row);
    }
  };
  $http.get('api/clients/all').then(function(res) {
    console.log(res);
    $scope.rowCollection = res.data;
    $scope.data = [].concat($scope.rowCollection);
    console.log($scope.rowCollection);
  }, function(err) {console.log(err.message);});
}]);
