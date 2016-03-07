
app.controller('AdminApptsCtrl', ['$scope', '$http',
'store', 'apptRec', function($scope, $http, store, apptRec) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  $scope.getTableData = function() {
    $http.get('api/appointments').then(function successCallback(res) {
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
    }, function errorCallback(err) {
      alert('Error, Can not get Appointments: ' + err.data);
    });
  };

  var formReset = function() {
    $scope.form.date = undefined;
    $scope.form.startTime = undefined;
    $scope.form.endTime = undefined;
    $scope.form.recurrence = undefined;
    $scope.form.dateRec = undefined;
  };

  $scope.getTableData();

  $scope.submit = function() {
    var data = checkRec();
    $http({
      method: 'POST',
      url: '/api/appointments',
      data: data
    }).then(function successCallback(res) {
      formReset();
      $scope.getTableData();
    }, function errorCallback(err) {
      alert('Error, Appointment Not Created: ' + err.data);

    });
  };

  var checkRec = function() {
    if($scope.form.recurrence !== undefined) {
      return apptRec.recur($scope.form);
    } else {
      return $scope.form;
    }
  };

  $scope.seeFullAppt = function(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
    }
  };

  $scope.removeItem = function(row) {
    $http({
      method: 'DELETE',
      url: '/api/appointments/' + row._id
    }).then(function successCallback(res) {
      $scope.getTableData();
    }, function errorCallback(err) {
      alert('Error, Appointment Not Deleted: ' + err.data);
    });
  };

  $scope.itemsByPage = 15;

}]);
