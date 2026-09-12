const path = require("path");
const fs = require("fs");
const rootDir = require("../util/path");
const { favClass } = require("../model/favourites");
const favouriteFilePath = path.join(rootDir, "model", "data", "fav.json");

const db = require("../util/databaseSQL");

let addedHomes = [];

class homeClass {
  constructor(Name, Email, Location, Image, Price, Phone,Id) {
    this.Name = Name;
    this.Email = Email;
    this.Location = Location;
    this.Img = Image;
    this.Price = Price;
    this.Phone = Phone;
    this.id = Id;
  }

  save() {
    if(this.id){
      return db.execute('UPDATE homes SET Name=?, Price=?,Location=?,Img=?,Phone=?,Email=? WHERE id=?',[this.Name,this.Price,this.Location,this.Img,this.Phone,this.Email,this.id])
    }
    else{
      this.id = Math.floor(Math.random()*10000)
      return db.execute('INSERT INTO homes(Name,Price,Location,Img,Phone,Email,id) VALUE (?,?,?,?,?,?,?) ',[this.Name,this.Price,this.Location,this.Img,this.Phone,this.Email,this.id])
    }
    
  }
  static deleteData(id) {
   return db.execute('DELETE FROM homes WHERE id =?',[id]);
  }

  static fetchData() {
    return db.execute('SELECT * FROM homes')
  }

  static findByID(id) {
      return db.execute('SELECT * FROM homes WHERE id =?',[id]);
  }
}
module.exports = {
  homeClass,
  addedHomes,
};
