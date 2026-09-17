const { ObjectId } = require("mongodb");
const { favClass } = require("../model/favourites");
const mongoose = require("mongoose");

//findByID deleteData find save
const homeSchema = new mongoose.Schema({
  Name:{type:String,required:true},
  Email:{type:String,required:true},
  Location:{type:String,required:true},
  Price:{type:String,required:true},
  Phone:{type:String,required:true},
  Img: String

})
module.exports = mongoose.model('home',homeSchema)
