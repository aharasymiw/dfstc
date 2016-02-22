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
      }
    });
  },

  getAppointment: function(callback) {
    Appointment.find({}, function(err, appointments) {
      if(err) {
        callback({message: 'No records found'});
      } else {
        callback(appointments);
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
  },

  deleteAppointment: function(data) {
    var ObjectId = mongoose.Types.ObjectId;
    var id = ObjectId(data);
    Appointment.findByIdAndRemove(id, function(err) {
      if(err) {
      } else {
      }
    });
  },
};

module.exports = appointmentService;
