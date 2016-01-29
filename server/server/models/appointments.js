// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema(
  {
    title: String,
    type: String,
    startAt: String,
    endsAt: String,
    draggable: Boolean,
    resizable: Boolean
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
