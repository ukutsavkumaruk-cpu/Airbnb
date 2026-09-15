const { ObjectId } = require("mongodb");
const { favClass } = require("../model/favourites");
const{getDB} = require('../util/databaseSQL')



let addedHomes = [];

class homeClass {
  constructor(Name, Email, Location, Image, Price, Phone,Id) {
    this.Name = Name;
    this.Email = Email;
    this.Location = Location;
    this.Img = Image;
    this.Price = Price;
    this.Phone = Phone;
  }

  save() {
    const db = getDB();

    if(this.id){
      return db.collection('homes').updateOne({_id:new ObjectId(String(this.id))},{$set: this});
    }
    else{
      return db.collection('homes').insertOne(this)
    .then((result)=>{
      console.log("Home added successfully",result);
    })
    .catch((err)=>{
      console.log("Error accurs while saving home",err);
    })
    }
    

  }
  
  static deleteData(id) {
    const db = getDB();
    return db.collection('homes').deleteOne({_id:new ObjectId(String(id))});

  }

  static fetchData() {
    const db = getDB();
    return db.collection('homes').find().toArray();

  }

  static findByID(id) {
    const db = getDB();
    return db.collection('homes').find({_id:new ObjectId(String(id))}).next();

  }
}
module.exports = {
  homeClass,
  addedHomes,
};
