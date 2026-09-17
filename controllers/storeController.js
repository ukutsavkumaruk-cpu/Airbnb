const favClass  = require("../model/favourites");
const homeClass = require("../model/home");
const path = require('path')
const fs = require('fs')
const rootDir = require('../util/path')

const favouriteFilePath = path.join(rootDir,'model','data','fav.json')

exports.getHome = (req,res,next) =>{

   homeClass.find().then((addedHomes)=>{
      console.log(addedHomes)
      res.render('store/home-list',{addedHomes:addedHomes,
         pageTitle:'home'}
      )})
   .catch(err =>{
  console.log("Error while fetching DB :",err)
})
   }

exports.getBookings = (req,res,next) =>{
  homeClass.find().then((addedHomes)=>{res.render('store/bookings',{addedHomes:addedHomes,pageTitle:'bookings'})});
  }

exports.getFavourites = (req,res,next) =>{
   favClass.getFavourites().then( favs =>{
   favs = favs.map(favs => favs.houseId)
   homeClass.find()
   .then((addedHomes)=>{
      const favHomeDetail = addedHomes.filter((home)=>favs.includes(home._id.toString()))
      res.render('store/favourite-list',{favHomeDetail:favHomeDetail,pageTitle:'favourites'})})})
  }

exports.getHomeDetail = (req,res,next) =>{
   const homeID = req.params.homeID;
   homeClass.findById(homeID)
   .then((home) =>{
      if(!home){res.redirect('/')
   console.log('home not found')}
      else{
         res.render('store/home-detail',{pageTitle:'home-detail',home:home})
      }
      
   })
  }
exports.postAddToFavourite = (req,res,next) =>{
    const favId = req.body.id;
    console.log("Ye wo favId hai jo url se aai hai: ",favId)
    const newFav = new favClass(favId)
    favClass.getFavourites().then(favs =>{
      console.log("Yahi hai jo tum dhoondh rahe ho : ",favs)
      favs = favs.map(unit => unit.houseId);
      let idPass = favs.includes(favId)
      if(!idPass){
      newFav.addFavourites()
    .then((res)=>{
      console.log("Your home added to favList.",res)
    })
    .catch((err)=>{
      console.log("Your home failed added to favList.",err)
    })
    .finally(()=>res.redirect('/store/favourite-list'))
     }
     else{
      console.log("Favourite home already in favList.")
      res.redirect('/store/favourite-list')
     }
     })
  }
  
exports.postDeleteFavourite = (req,res,next) =>{
   const favId = req.body.id;
   console.log(favId)
    favClass.deleteFav(favId)
    .then(res=>{
      console.log('Successfully deleted',res);
    })
    .catch(err=>{
      console.log("Error occurs while deleting",err)
    })
    .finally(() => {
  res.redirect('/store/favourite-list');
})
  }
  
   