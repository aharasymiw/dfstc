
app.controller('AdminApptsCtrl', ['$scope', '$http',
'store', 'apptRec', function($scope, $http, store, apptRec) {

  $scope.form = {
    recurrence: undefined
  };

  $scope.submit = function() {
    var data = checkRec();
    $http({
      method: 'POST',
      url: '/api/appointments',
      data: data
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  var checkRec = function(){
    if($scope.form.recurrence != undefined) {
      return apptRec.recur($scope.form);
    } else {
      return $scope.form;
    }
  };

}]);

//Controls the toggle of the side-menu bar

