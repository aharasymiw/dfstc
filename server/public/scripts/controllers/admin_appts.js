
app.controller('AdminApptsCtrl', ['$scope', '$http',
'store', 'apptRec', function($scope, $http, store, apptRec) {
  $scope.rowCollection = [];
  $scope.data = [].concat($scope.rowCollection);

  $scope.getTableData = function() {
    $http.get('api/appointments').then(function(res) {
      console.log(res);
      $scope.rowCollection = res.data;
      $scope.data = [].concat($scope.rowCollection);
      console.log($scope.rowCollection);
    }, function(err) {
      console.log(err.message);
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
    }).then(function successCallback(response) {
      console.log(response);
      $scope.getTableData();
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

  $scope.removeItem = function removeItem(row) {
    var index = $scope.rowCollection.indexOf(row);
    if (index !== -1) {
      $scope.rowCollection.splice(index, 1);
    }
    console.log(row._id);
  };

  $scope.itemsByPage=15;

}]);

//Controls the toggle of the side-menu bar

