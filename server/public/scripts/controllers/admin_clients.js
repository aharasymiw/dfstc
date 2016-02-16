app.controller('AdminClientsCtrl', ['$scope', '$http',
  '$location', 'store', function($scope, $http, $location, store) {
  //Returns an array of all records in the clients collection
  $scope.rowCollection = [];
  $scope.clientArray = null;
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
    for(var i = 0; i < $scope.data.length; i++){
      if($scope.data[i]._id === id){
        $scope.clientArray = $scope.data[i];
      }
    }
  };
  $scope.testScope = function(){
    console.log($scope.clientArray);
  };
}]);
