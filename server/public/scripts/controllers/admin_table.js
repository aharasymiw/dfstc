/**
 * Created by Brandi on 1/29/16.
 */
app.controller('tableController',[ '$http', '$scope', function($http, $scope){
    console.log("I'm in the controller");
    $scope.rowCollection = [];
    $scope.data = [].concat($scope.rowCollection);

    $http.get('api/clients/all').then(function(res) {
        console.log(res);
        $scope.rowCollection = res.data;
        $scope.data = [].concat($scope.rowCollection);
        console.log($scope.rowCollection);
    });

}])