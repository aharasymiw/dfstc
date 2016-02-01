app.controller('AdminClientsCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {

  //Returns an array of all records in the clients collection
  $http({
    method: 'GET',
    url: '/api/clients/all'
  }).then(function successCallback(response) {
  }, function errorCallback(response) {
  });

}]);
