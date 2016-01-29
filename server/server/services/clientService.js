var mongoose = require('mongoose');
var Client = require('../models/clients');

var clientService = {
	newClient: function (data){
		var client = new Client(data);
		client.save(function(err){
			if(err){
				console.log(err);
			}
		})
	}
};

module.exports = clientService;