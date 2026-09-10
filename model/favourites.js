const path = require('path');
const fs = require('fs')
const rootDir = require('../util/path')

const fav = [];
const favouriteFilePath = path.join(rootDir,'model','data','fav.json')

class favClass{

  static addFavourites(id,callback){
    this.getFavourites((favourites) =>{
      if(favourites.includes(id)){
        console.log("Home already present");
      }
      else{
        favourites.push(id)
        fs.writeFile(favouriteFilePath, JSON.stringify(favourites),(err)=>{
          callback(err)
        })
      }
    })
  }
  
  static getFavourites(callback){
    fs.readFile(favouriteFilePath,(err,data) =>{
      return callback(!err ? JSON.parse(data) : [])
    })
  }

  static deleteFav(id,callback){
    this.getFavourites(favHomes =>{
       const favouriteHomes = favHomes.filter(favId => {return id!=favId})
      callback(favouriteHomes)
    })  
  }
  
}
module.exports ={
  favClass
}