/**
 * Created by Brandi on 1/29/16.
 */
app.controller('tableController', function($http, $scope) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  $http.get('/clients').then(function(res) {
    console.log(res);
    $scope.rowCollection = res.clients;
    $scope.data = [].concat($scope.rowCollection);
    console.log($scope.rowCollection);
  });

});
