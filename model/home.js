const path = require('path');
const fs = require('fs')
const rootDir = require('../util/path')
const { favClass } = require("../model/favourites");
const favouriteFilePath = path.join(rootDir,'model','data','fav.json')


let addedHomes = [];

class homeClass{

  constructor(Name,Email,Location,Image,Price,Phone){
    this.Name = Name;
    this.Email = Email;
    this.Location = Location;
    this.Img = Image;
    this.Price = Price;
    this.Phone = Phone;
  }

  save(){
    homeClass.fetchData(addedHomes =>{
      if(this.id){
        addedHomes = addedHomes.map(home =>{
          if(home.id == this.id){
            return this;
          }
          return home;
        })
    }
    else{
      this.id = Math.random().toString();
      addedHomes.push(this)
    }
    const homeFilePath = path.join(rootDir,'model','data','data.json')
    fs.writeFile(homeFilePath, JSON.stringify(addedHomes), (err)=>{
      console.log("Error aaya hai:",err)
    })
    }) 
  }
  static deleteData(id,callback){
    this.fetchData(addedHomes=>{
    addedHomes = addedHomes.filter(home =>{
       return home.id != id;
    })
    const homeFilePath = path.join(rootDir,'model','data','data.json')
    fs.writeFile(homeFilePath, JSON.stringify(addedHomes), (err)=>{
      if(err){
        console.log("Error aaya hai:",err);
      }
      else{
        favClass.deleteFav(id,(favHomes)=>{
        
                      fs.writeFile(favouriteFilePath, JSON.stringify(favHomes),(err)=>{
                       if(err) console.log('Error in deletion of favId: ',err)        
                      })
                     })
        return callback(addedHomes);
      }
      }) 
      
  })
  }

  static fetchData(callback){
    const ReadFilePath = path.join(rootDir,'model','data','data.json')
    fs.readFile(ReadFilePath,(err,data)=>{
      if(!err){
       return callback(addedHomes = JSON.parse(data))
      }
      else{
       return callback([]);
      }
    })
  }

   static findByID(id,callback){
    this.fetchData((homes) =>{
      const homeFound = homes.find((home) =>home.id === id)
      callback(homeFound)
    })
  }
}
module.exports ={
  homeClass,addedHomes
}