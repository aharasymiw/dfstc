var app = angular.module('app', ['auth0', 'angular-storage', 'angular-jwt',
'ngRoute',
// 'mwl.calendar', 'ui.bootstrap'
]);

app.config(['authProvider', '$routeProvider', '$locationProvider',
'$httpProvider', 'jwtInterceptorProvider', function(authProvider,
$routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

  $routeProvider.
    when('/client', {
      templateUrl: '../views/routes/client.html',
      controller: 'ClientController',
      requiresLogin: true
    }).when('/volunteer/signup', {
      templateUrl: '../views/routes/volunteerSignup.html',
      controller: 'VolunteerSignupController',
      requiresLogin: true
    }).when('/volunteer/schedule', {
      templateUrl: '../views/routes/volunteerSchedule.html',
      controller: 'VolunteerScheduleController',
      requiresLogin: true
    }).when('/caseworker/signup', {
      templateUrl: '../views/routes/caseworkerSignup.html',
      controller: 'CaseworkerSignupController',
      requiresLogin: true
    }).when('/admin/calendar', {
      templateUrl: '../views/routes/adminCalendar.html',
      controller: 'AdminCalendarController',
      requiresLogin: true
    }).when('/admin/users', {
      templateUrl: '../views/routes/adminUsers.html',
      controller: 'AdminUsersController',
      requiresLogin: true
    }).when('/login', {
      templateUrl: '../views/routes/login.html',
      controller: 'LoginController'
    }).when('/error', {
      templateUrl: '../views/routes/error.html',
      controller: 'ErrorController',
    }).otherwise({
      redirectTo: '/client'
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
  )/*.factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: 'modelContent.html',
        controller: function($scope) {
          var vm = this;
          $scope.action = action;
          $scope.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };
  })*/;

// "auth0-lock": "^8.1.5",
