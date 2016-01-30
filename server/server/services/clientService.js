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

};

module.exports = clientService;