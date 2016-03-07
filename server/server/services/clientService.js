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
  },

  editClient: function(data) {
    //Converts data._id into an id type, which can query mongo database.
    var ObjectId = mongoose.Types.ObjectId;
    var id = ObjectId(data._id);
    //Object containing all the fields in the form, set equal to the data value.
    var clientUpdate = {
      clientFirstName: data.clientFirstName,
      clientLastName: data.clientLastName,
      clientStreetL1: data.clientStreetL1,
      clientStreetL2: data.clientStreetL2,
      clientCity: data.clientCity,
      clientState: data.clientState,
      clientZip: data.clientZip,
      clientHomePh: data.clientHomePh,
      clientCellPh: data.clientCellPh,
      clientEmail: data.clientEmail,
      altContactName: data.altContactName,
      altContactPh: data.altContactPh,
      altContactRel: data.altContactRel,
      clientAge: data.clientAge,
      clientHeight: data.clientHeight,
      clientTopSize: data.clientTopSize,
      clientBottomSize: data.clientBottomSize,
      clientShoeSize: data.clientShoeSize,
      clientRestrictions: data.clientRestrictions,
      interviewStartDate: data.interviewStartDate,
      employmentStartDate: data.employmentStartDate,
      company: data.company,
      jobTitle: data.jobTitle,
      schedulingRestrictions: data.schedulingRestrictions
    };
    //Loop to remove undefined values from clientUpdate object to prevent database errors
    for(prop in clientUpdate) {
      //If the property is undefined, delete it from the clientUpdate object
      if(clientUpdate[prop] === undefined) {
        delete clientUpdate[prop];
      }
    };

    //Once loop is complete, update document with matching id using the clientUpdate object
    Client.update({_id: id}, clientUpdate, function catchError(err){
      return err;
    });
  },

  deleteClient: function(data) {
    var ObjectId = mongoose.Types.ObjectId;
    var id = ObjectId(data);
    Client.findByIdAndRemove(id, function(err) {
      if(err) {
        return('DB Error: ', err);
      } else {
        return('Client Account Deleted');
      }
    });
  }
};

module.exports = clientService;
