
app.controller('AdminApptsCtrl', ['$scope', '$http',
'store', 'apptRec', function($scope, $http, store, apptRec) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  $scope.getTableData = function() {
    $http.get('api/appointments').then(function successCallback(res) {
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
    }, function errorCallback(err) {
    });
  };

  $scope.getTableData();

  $scope.form = {
    recurrence: undefined
  };

  $scope.submit = function() {
    var data = checkRec();
    console.log(data);
    $http({
      method: 'POST',
      url: '/api/appointments',
      data: data
    }).then(function successCallback(res) {
      console.log('Status: ', res.status);
      console.log('Data: ', res.data);
      $scope.getTableData();
    }, function errorCallback(err) {
      console.log('Status: ', err.status);
      console.log('Data: ', err.data);
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
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      $scope.rowCollection.splice(index, 1);
    }

    $http({
      method: 'DELETE',
      url: '/api/appointments/' + row._id
    }).then(function successCallback(res) {
      console.log('Status: ', res.status);
      console.log('Data: ', res.data);
    }, function errorCallback(err) {
      console.log('Status: ', err.status);
      console.log('Data: ', err.data);
    });

  };

  $scope.itemsByPage = 15;

}]);
