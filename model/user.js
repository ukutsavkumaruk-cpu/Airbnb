const mongoose = require("mongoose");

//findByID deleteData find save
const UserSchema = new mongoose.Schema({
  firstName:{type:String,required:true},
  lastName:{type:String},
  userName:{type:String,required:true},
  password:{type:String,required:true},
  userType:{type:String,required:true},

})
module.exports = mongoose.model('User',UserSchema)