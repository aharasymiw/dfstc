// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema(
  {

  }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
