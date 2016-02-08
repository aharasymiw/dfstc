app.service('apptRec', function() {

  var recurrence = 0;

  var multiAppts = function(apptObj) {

    var newDate = 0;
    var tempDate = apptObj.date;

    var apptsArray = [];

    while(newDate <= apptObj.dateRec) {

      var tempAppt = {
        title: apptObj.title,
        date: 0,
        startTime: apptObj.startTime,
        endTime: apptObj.endTime
      };

      newDate = new Date(tempDate.getTime() + recurrence);
      tempAppt.date = newDate;
      apptsArray.push(tempAppt);
      tempDate = newDate;

    }

    return apptsArray;

  };


  this.recur = function(apptObj) {
    if(apptObj.recurrence === 'weekly') {
      recurrence = 6048e5;
    } else {
      recurrence = 12096e5;
    }

    return multiAppts(apptObj);
  };

});
