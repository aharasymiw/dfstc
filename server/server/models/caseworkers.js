// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var caseworkerSchema = new Schema(
  {

  }
);

module.exports = mongoose.model('Caseworker', caseworkerSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
