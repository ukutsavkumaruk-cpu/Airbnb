const favClass  = require("../model/favourites");
const homeClass = require("../model/home");


exports.getHome = (req,res,next) =>{
   homeClass.find().then((addedHomes)=>{
      console.log(addedHomes)
      res.render('store/home-list',{addedHomes:addedHomes,
         pageTitle:'home',isLoggedIn:req.isLoggedIn}
      )})
   .catch(err =>{
  console.log("Error while fetching DB :",err)
})
   }

exports.getBookings = (req,res,next) =>{
  homeClass.find().then((addedHomes)=>{res.render('store/bookings',{addedHomes:addedHomes,pageTitle:'bookings',isLoggedIn:req.isLoggedIn})});
  }

  exports.getHomeDetail = (req,res,next) =>{
   const homeID = req.params.homeID;
   homeClass.findById(homeID)
   .then((home) =>{
      if(!home){res.redirect('/')
   console.log('home not found')}
      else{
         res.render('store/home-detail',{pageTitle:'home-detail',home:home,isLoggedIn:req.isLoggedIn})
      }
      
   })
  }

exports.getFavourites = (req,res,next) =>{
   favClass.find().then( favs =>{
   favs = favs.map(favs => favs.houseId.toString())
   homeClass.find().then((addedHomes)=>{
      const favHomeDetail = addedHomes.filter((home)=>favs.includes(home._id.toString()))
      res.render('store/favourite-list',{favHomeDetail:favHomeDetail,pageTitle:'favourites',isLoggedIn:req.isLoggedIn})})
   .catch(err =>{console.log("Error while fetching homes.",err)})})
  }


exports.postAddToFavourite = (req,res,next) =>{
    const favId = req.body.id;
      const newFav = new favClass({
         houseId:favId
      })
      newFav.save()
    .then(result =>{console.log("Fav Added..",result)
    })
    .catch(err =>{console.log("Error occur while adding fav",err)})
    .finally(()=>res.redirect('/store/favourite-list'))
   }
    



  
exports.postDeleteFavourite = (req,res,next) =>{
   const favId = req.body.id;
   console.log(favId)
    favClass.findOneAndDelete({houseId:favId})
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
  
   