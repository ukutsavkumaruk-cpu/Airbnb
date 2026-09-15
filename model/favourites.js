const { getDB } = require('../util/databaseSQL');
const { ObjectId } = require("mongodb");



module.exports = class favClass{

  constructor(houseId){
    this.houseId = houseId;
  }

  addFavourites(){
    const db = getDB()
    return db.collection('favourites').insertOne(this)
    .then((result)=>{
      console.log("added to favourite successfully",result);
    })
    .catch((err)=>{
      console.log("Error accurs while saving favourites",err);
    })
  }
  
  static getFavourites(){
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static deleteFav(id){
    const db = getDB();
        return db.collection('favourites').deleteOne({houseId:id});

  }
  
}
