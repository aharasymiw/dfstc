// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema(
  {
    title: String,
      //Type will be left blank in the database until client fills it in.
    type: String,
    date: String,
    startTime: String,
    endTime: String
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
