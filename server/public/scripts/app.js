var app = angular.module('app', ['angular-storage', 'ngMaterial', 'angular-jwt', 'smart-table', 'ngRoute']);

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
    }).when('/admin/clients/details', {
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
  $httpProvider.interceptors.push('authInterceptor');

}]);

app.service('clientDetailService', [function() {
  var data = null;
}]);

app.service('authService', ['$window', '$q', function($window, $q) {

  var self = this;
  this.user = {};
  var defer = $q.defer();

  // This exposes the user object as a promise.
  // First two arguments of then are success and error callbacks, third one is notify callback.

  this.getUser = function() {
      self.setUser();
      return self.user;
    };

  this.observeUser = function() {
      return defer.promise;
    };

  this.setUser = function() {
      self.user = self.parseJwt(self.getToken());
      defer.notify(self.user);
    };

  this.parseJwt = function(token) {
      if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));

      } else {
        return {};
      }
    };

  this.saveToken = function(token) {
      $window.localStorage.jwtToken = token;
      self.setUser();
    };

  this.getToken = function() {
      return $window.localStorage.jwtToken;
    };

  this.isAuthed = function() {

    var token = this.getToken();
    if (token) {
      var params = self.parseJwt(token);
      var notExpired = Math.round(new Date().getTime() / 1000) <= params.exp;

      // if the user is expired, log them out
      if (!notExpired) {
        self.logout();
      }
      return notExpired;
    } else {
      return false;
    }
  };

  this.logout = function() {
      delete $window.localStorage.jwtToken;
      self.setUser();
    };
}]);

app.factory('authInterceptor', ['$q', '$location', 'authService', function($q,
$location, authService) {
  return {
      request: function(config) {
        config.headers = config.headers || {};
        if (authService.isAuthed()) {
          config.headers.Authorization = 'Bearer ' + authService.getToken();
        }
        return config;
      },
      response: function(response) {
        if (response.status === 401) {

          // delete the token
          authService.logout();

          // handle the case where the user is not authenticated
          $location.path('/login');
        }
        return response || $q.when(response);
      }
    };
}]);
