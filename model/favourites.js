const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
  houseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'homes',
    required:true,
    unique:true
  }
})

module.exports = mongoose.model('favourites',favouriteSchema);
