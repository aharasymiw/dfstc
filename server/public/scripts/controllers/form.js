app.controller('FormCtrl', ['$scope', '$http',
'store', function($scope, $http, store) {

		$scope.submit = function(){
			$http({
				method: 'POST',
				url: '/api/clients',
				data: $scope.form
			}).then(function successCallback(response) {

			}, function errorCallback(response) {
				console.log(response);
			});

		}

}]);
