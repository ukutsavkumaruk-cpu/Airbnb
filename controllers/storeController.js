const User = require('../model/user')
const homeClass = require("../model/home");


exports.getHome = (req,res,next) =>{
   homeClass.find().then((addedHomes)=>{
     
      res.render('store/home-list',{addedHomes:addedHomes,
         pageTitle:'home',isLoggedIn:req.isLoggedIn,
     user: req.session.user}
      )})
   .catch(err =>{
  console.log("Error while fetching DB :",err)
})
   }

exports.getBookings = (req,res,next) =>{
  homeClass.find().then((addedHomes)=>{res.render('store/bookings',{addedHomes:addedHomes,pageTitle:'bookings',isLoggedIn:req.isLoggedIn,
     user: req.session.user})});
  }

  exports.getHomeDetail = (req,res,next) =>{
   const homeID = req.params.homeID;
   homeClass.findById(homeID)
   .then((home) =>{
      if(!home){res.redirect('/')
   console.log('home not found')}
      else{
         res.render('store/home-detail',{pageTitle:'home-detail',home:home,isLoggedIn:req.isLoggedIn,
     user: req.session.user})
      }
      
   })
  }

exports.getFavourites = async (req,res,next) =>{
   const userId = req.session.user._id;
   const user = await User.findById(userId).populate('favourites');
   console.log("This is userId: ",userId)
   console.log("And this is user: ",user)
   res.render('store/favourite-list',{favHomeDetail:user.favourites,pageTitle:'favourites',isLoggedIn:req.isLoggedIn,
     user: req.session.user})
  }


exports.postAddToFavourite = async (req,res,next) =>{
    const favId = req.body.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId)
    if(!user.favourites.includes(favId)){
      user.favourites.push(favId);
      await user.save()
    }
    res.redirect('/')
   }
    
exports.getRules = (req, res, next) =>{
   console.log("Ye getRules wale routte ka hai: ",req.body)
   if(isLoggedIn){

      // res.render('rules')
   }
   else{
      // res.redirect()
   }
}


  
exports.postDeleteFavourite = async (req,res,next) =>{
   const favId = req.body.id;
   const userId = req.session.user._id;
   const user = await User.findById(userId)
   user.favourites =  user.favourites.filter(fav=> fav != favId)
   await user.save()
   res.redirect('/store/favourite-list')
  }
  
   