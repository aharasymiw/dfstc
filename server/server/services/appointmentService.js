/**
 * Created by cwklausing on 2/1/16.
 */
var mongoose = require('mongoose');
var Appointment = require('../models/appointments');

var response = {};

var appointmentService = {

  getAppointment: function(answer) {
    Appointment.find({}, function(err, appointments) {
      if(err) {
        response.status = err.status;
        response.data = err.message;
        answer(response);
      }
      response.status = '200';
      response.data = appointments;
      answer(response);
    }).sort({date: 1});
  },

  newAppointment: function(data, answer) {
    if (typeof data[1] === 'object') {
      Appointment.insertMany(data, function(err) {
        if(err) {
          response.status = err.status;
          response.data = err.message;
          answer(response);
        }
        response.status = '200';
        response.data = 'New Appointment Slots Created';
        answer(response);
      });
    } else {
      Appointment.create(data, function(err) {
        if(err) {
          response.status = err.status;
          response.data = err.message;
          answer(response);
        }
        response.status = '200';
        response.data = 'New Appointment Slot Created';
        answer(response);
      });
    }
  },

  deleteAppointment: function(data, answer) {
    var id = mongoose.Types.ObjectId(data);
    Appointment.findByIdAndRemove(id, function(err) {
      if(err) {
        response.status = err.status;
        response.data = err.message;
        answer(response);
      }
      response.status = '200';
      response.data = 'Appointment Deleted';
      answer(response);
    });
  },

  updateAppointment: function(data, answer) {
    Appointment.update({_id: data._id}, {title: 'Filled',
    appointmentType: data.appointmentType, email: data.email},
    function(err) {
      if(err) {
        response.status = err.status;
        response.data = err.message;
        answer(response);
      }
      response.status = '200';
      response.data = 'Appointment Selected';
      answer(response);
    });
  }
};

module.exports = appointmentService;
