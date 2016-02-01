var app = angular.module('app', ['angular-storage', 'angular-jwt', 'smart-table',
'ngRoute']);

app.config(['$routeProvider', '$locationProvider',
'$httpProvider', 'jwtInterceptorProvider', function(
$routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

    $routeProvider.
    when('/admin/appts', {
      templateUrl: '../views/routes/admin_appts.html',
      controller: 'AdminApptsCtrl'
    }).when('/admin/caseworkers', {
      templateUrl: '../views/routes/admin_caseworkers.html',
      controller: 'AdminCaseworkersCtrl'
    }).when('/admin/clients', {
      templateUrl: '../views/routes/admin_clients.html',
      controller: 'AdminClientsCtrl'
    }).when('/admin/details', {
      templateUrl: '../views/routes/client_details.html',
      controller: 'AdminClientsCtrl'
    }).when('/form', {
      templateUrl: '../views/routes/form.html',
      controller: 'FormCtrl'
    }).when('/home', {
      templateUrl: '../views/routes/home.html',
      controller: 'HomeCtrl'
    }).when('/admin_table', {
        templateUrl: '../views/routes/admin_table.html',
        controller: 'tableController'
    }).otherwise({
      redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);


  }]);

// "auth0-lock": "^8.1.5",
