const { favClass } = require("../model/favourites");
const {homeClass} = require("../model/home");
const path = require('path')
const fs = require('fs')
const rootDir = require('../util/path')

const favouriteFilePath = path.join(rootDir,'model','data','fav.json')

exports.getHome = (req,res,next) =>{
   homeClass.fetchData(addedHomes =>{res.render('store/home-list',{addedHomes:addedHomes,pageTitle:'home'})});
  }

exports.getBookings = (req,res,next) =>{
   homeClass.fetchData(addedHomes =>{res.render('store/bookings',{addedHomes:addedHomes,pageTitle:'bookings'})});
  }

exports.getFavourites = (req,res,next) =>{
   favClass.getFavourites( favs =>{
   homeClass.fetchData(addedHomes =>{
      const favHomeDetail = addedHomes.filter((home)=>favs.includes(home.id))
      res.render('store/favourite-list',{favHomeDetail:favHomeDetail,pageTitle:'favourites'})})})
  }

exports.getHomeDetail = (req,res,next) =>{
   const homeID = req.params.homeID;
   const home = homeClass.findByID(homeID,(home) =>{
      if(!home){res.redirect('/')
   console.log('home not found')}
      else{
         res.render('store/home-detail',{pageTitle:'home-detail',home:home})
      }
      
   })
  }
exports.postAddToFavourite = (req,res,next) =>{
    const favId = req.body.id;
    favClass.addFavourites(favId,(err)=>{
      console.log('Error happens',err)
    })
   res.redirect('/store/favourite-list')
  }
  
exports.postDeleteFavourite = (req,res,next) =>{
    const favId = req.body.id;
    favClass.deleteFav(favId,(favHomes)=>{

              fs.writeFile(favouriteFilePath, JSON.stringify(favHomes),(err)=>{
               if(err) console.log('Error in deletion of favId: ',err)
                  else{
                res.redirect('/store/favourite-list')
               }
                
              })
    })
    
  
  }
  
   