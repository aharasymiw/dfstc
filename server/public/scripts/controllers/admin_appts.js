
app.controller('AdminApptsCtrl', ['$scope', '$http',
'store', 'apptRec', function($scope, $http, store, apptRec) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  $scope.getTableData = function() {
    $http.get('api/appointments').then(function(res) {
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
    }, function(err) {
    });
  };

  $scope.getTableData();

  $scope.form = {
    recurrence: undefined,
  };

  $scope.submit = function() {
    console.log('time: ', $scope.form.startTime);
    console.log('date: ', $scope.form.date);
    var data = checkRec();
    $http({
      method: 'POST',
      url: '/api/appointments',
      data: data,
    }).then(function successCallback(response) {
      $scope.getTableData();
    }, function errorCallback(response) {
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
      console.log(row);
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
    }).then(function successCallback(response) {
    }, function errorCallback(response) {
    });

  };

  $scope.itemsByPage = 15;

},]);
