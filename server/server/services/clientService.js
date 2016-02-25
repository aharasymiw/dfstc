var mongoose = require('mongoose');
var Client = require('../models/clients');

var clientService = {

  newClient: function(data) {
    var client = new Client(data);
    client.save(function(err) {
      if(err) {
        console.log(err);
      }
    });
  },
  getClients: function(callback) {
    Client.find({}, function(err, clients) {
      if(err) {
        callback({message: 'No records found'});
      }
      callback(clients);
    });
  }
  //updateClient: function(data) {
  //  Client.update({_id: data._id}, {title: 'Filled',
  //        appointmentType: data.appointmentType, email: data.email},
  //      function(err, num) {
  //        if(err) {
  //          console.log(err);
  //          return {
  //            status: err.status,
  //            data: err.data
  //          };
  //        }
  //      });
  //  return {
  //    status: 200,
  //    data: 'appointment updated successfully'
  //  };
  //}
};

module.exports = clientService;
