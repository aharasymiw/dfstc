app.controller('AdminCalendarController', ['$scope', '$http', 'auth', 'store',
'moment', 'calendarConfig', '$uibModal', function($scope, $http, auth, store,
moment, calendarConfig, $uibModal) {

  var status = {
    open: 'Open Time Slot'
  };

  $scope.view = 'month';

  $scope.viewDate = new Date(2016, 1, 1, 0);

  console.log($scope.events);

  $scope.form = {

  };

  $scope.submit = function() {
    $scope.form.title = status.open;
    $scope.form.type = 'info';
    $scope.form.startsAt = $scope.valuationDate;
    $scope.events.push($scope.form);
    console.log($scope.events);

  };

  $scope.events = [
    {
      title: 'Event ID 1',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16),
      available: true

    },
    {
      title: 'Event ID 2',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16),
      available: false
    },
    {
      title: 'Event ID 3',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16)
    },
    {
      title: 'Event ID 4',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16)
    },
    {
      title: 'Event ID 4',
      type: 'info',
      startsAt: new Date(2016, 1, 14, 15),
      endsAt: new Date(2016, 1, 14, 16)
    }
  ];

  $scope.isCellOpen = true;

  $scope.eventClicked = function(event) {
    if(event.available === true) {
      console.log('You can choose me!');
    } else {
      console.log('sorry mate!');
    }
  };

  //$scope.valuationDate = '';
  $scope.valuationDatePickerIsOpen = false;

  $scope.valuationDatePickerOpen = function() {
    $scope.valuationDatePickerIsOpen = true;
  };

  $scope.timespanClicked = function(date) {
    $scope.valuationDate = date;

    /*$uibModal.open({
      templateUrl: 'addEventModal.html',
      controller: 'adminCal',
      size: 'lg',
      scope: $scope
      })*/
  };

}]);
