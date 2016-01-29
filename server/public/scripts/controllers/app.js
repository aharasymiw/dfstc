app.controller('AppController', ['$scope', '$location',
function AppCtrl($scope, $location) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
    if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
    }
  });
}]);
