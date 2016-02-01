
app.controller('AdminApptsCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {
        $scope.submit = function(){
            $http({
                method: 'POST',
                url: '/api/appointments',
                data: $scope.form
            }).then(function successCallback(response) {

            }, function errorCallback(response) {
                console.log(response);
            });

        }
}]);

//Controls the toggle of the side-menu bar

