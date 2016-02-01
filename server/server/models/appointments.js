// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema(
  {
    title: {type: String, default: 'Open Time Slot'},
      //Type will be left blank in the database until client fills it in.
    appointmentType: {type: String, default: null},
      //Email will be blank until the time slot is filled by a client
    email: {type: String, default: null},
    date: Date,
    startTime: Date,
    endTime: Date
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
