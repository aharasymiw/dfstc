/**
 * Created by cwklausing on 2/1/16.
 */
var mongoose = require('mongoose');
var Appointment = require('../models/appointments');

var response = {};
var bookedAppt = 'Filled';
var success = {
  okay: '200',
  new: 'New Appointment Slot Created',
  newMulti: 'New Appointment Slots Created',
  delted: 'Appointment Deleted',
  updated: 'Appointment Updated'
};

var appointmentService = {

  getAppointment: function(answer) {
    Appointment.find({}, function(err, appointments) {
      if(err) {
        response.status = err.status;
        response.data = err.message;
        answer(response);
      }
      response.status = success.okay;
      response.data = appointments;
      answer(response);
    }).sort({date: 1});
  },

  newAppointment: function(data, answer) {
    //Check to see if data is an array of appointments
    if (typeof data[1] === 'object') {
      Appointment.insertMany(data, function(err) {
        if(err) {
          response.status = err.status;
          response.data = err.message;
          answer(response);
        }
        response.status = success.okay;
        response.data = success.newMulti;
        answer(response);
      });
    } else {
      Appointment.create(data, function(err) {
        if(err) {
          response.status = err.status;
          response.data = err.message;
          answer(response);
        }
        response.status = success.okay;
        response.data = success.new;
        answer(response);
      });
    }
  },

  deleteAppointment: function(data, answer) {
    //Convert the appt 'id' into an _id object for mongoose
    var id = mongoose.Types.ObjectId(data);
    Appointment.findByIdAndRemove(id, function(err) {
      if(err) {
        response.status = err.status;
        response.data = err.message;
        answer(response);
      }
      response.status = success.okay;
      response.data = success.deleted;
      answer(response);
    });
  },

  updateAppointment: function(data, answer) {
    //bookedAppt is a string variable defined above
    Appointment.update({_id: data._id}, {title: bookedAppt,
    appointmentType: data.appointmentType, email: data.email},
    function(err) {
      if(err) {
        response.status = err.status;
        response.data = err.message;
        answer(response);
      }
      response.status = success.okay;
      response.data = success.updated;
      answer(response);
    });
  }
};

module.exports = appointmentService;
