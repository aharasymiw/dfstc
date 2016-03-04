
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
    $http({
      method: 'POST',
      url: '/api/appointments',
      data: data
    }).then(function successCallback(res) {
      $scope.getTableData();
    }, function errorCallback(err) {
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
    }, function errorCallback(err) {
    });

  };

  $scope.itemsByPage = 15;

}]);
