// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema(
  {
    clientFirstName: String,
    clientLastName: String,
    clientStreetL1: String,
    clientStreetL2: String,
    clientCity: String,
    clientState: String,
    clientZip: Number,
    clientHomePh: Number,
    clientCellPh: Number,
    clientEmail: String,
    altContactName: String,
    altContactPh: Number,
    altContactRel: String,
    clientAge: Number,
    clientHeight: Number,
    clientTopSize: String,
    clientBottomSize: String,
    clientShoeSize: String,
    clientRestrictions: String,
    todayDate: {type: Date, default: Date.now},
    interviewStartDate: Date,
    employmentStartDate: Date,
    internshipStartDate: Date,
    company: String,
    jobTitle: String,
    schedulingRestrictions: String
  }
);

module.exports = mongoose.model('Client', clientSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
