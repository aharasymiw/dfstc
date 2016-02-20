app.controller('FormCtrl', ['$scope', '$http', 'store', function($scope, $http, store) {

  var retrieveAppointments = function() {
    $http({
      method: 'GET',
      url: '/api/appointments'
    }).then(function successCallback(response) {
      $scope.appointments = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  retrieveAppointments();

  $scope.submit = function() {
    console.log('FIRE!!!');
    $http({
      method: 'POST',
      url: '/api/clients',
      data: $scope.form
    }).then(function successCallback(response) {

    }, function errorCallback(response) {
      console.log(response);
    });

  };

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
  'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
  'WY').split(' ').map(function(state) {
    return {abbrev: state};
  });
}])
    .config(function($mdThemingProvider) {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
});


