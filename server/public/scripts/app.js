var app = angular.module('app', ['auth0', 'angular-storage', 'angular-jwt',
'ngRoute',]);

app.config(['authProvider', '$routeProvider', '$locationProvider',
'$httpProvider', 'jwtInterceptorProvider', function(authProvider,
$routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

  $routeProvider.
    when('/admin/appts', {
      templateUrl: '../views/routes/admin_appts.html',
      controller: 'AdminApptsCtrl',
      requiresLogin: false
    }).when('/admin/caseworkers', {
      templateUrl: '../views/routes/admin_caseworkers.html',
      controller: 'AdminCaseworkersCtrl',
      requiresLogin: false
    }).when('/admin/clients', {
      templateUrl: '../views/routes/admin_clients.html',
      controller: 'AdminClientsCtrl',
      requiresLogin: false
    }).when('/admin/details', {
      templateUrl: '../views/routes/client_details.html',
      controller: 'ClientDetailsCtrl',
      requiresLogin: false
    }).when('/form', {
      templateUrl: '../views/routes/form.html',
      controller: 'FormCtrl',
      requiresLogin: false
    }).when('/home', {
      templateUrl: '../views/routes/home.html',
      controller: 'HomeCtrl',
      requiresLogin: false
    }).otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);

  authProvider.init({
    domain: 'dressupmn.auth0.com',
    clientID: '3PJOzGYro7Y69eXWwikD34gq7R0FClC3',
    //callbackURL: location.href, ?
    // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
    loginUrl: '/login'
  });

  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = function(store) {
    // Return the saved token
    return store.get('token');
  };

  $httpProvider.interceptors.push('jwtInterceptor');
}]).run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
  auth.hookEvents();
}
  );

// "auth0-lock": "^8.1.5",
