/**
 * Created by cwklausing on 2/1/16.
 */
var mongoose = require('mongoose');
var Appointment = require('../models/appointments');

var appointmentService = {
  newAppointment: function(data) {
    var appointment = new Appointment(data);
    appointment.save(function(err) {
      if(err) {
        console.log(err);
      }
    });
  },
  getAppointment: function(data) {
    Appointment.find({}, function(err, caseworkers) {
      if(err) {
        callback({message: 'No records found'});
      } else {
        callback(caseworkers);
      }
    });
  },
  newMultiAppointment: function(data) {
    Appointment.create(data, function(err, array) {
      if(err) {
        return err;
      }else {
        return array;
      }
    });
  }
};

module.exports = appointmentService;