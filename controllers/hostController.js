const  homeClass = require("../model/home");
const fs = require('fs');
const path = require("../util/path");


exports.getAddHome = (req, res, next) => {
  const editing = req.query.editing === 'true';
  res.render('host/edit-Home', { pageTitle: 'newHome', editing: editing,isLoggedIn:req.isLoggedIn,
     user: req.session.user })
}
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  homeClass.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing")
      res.redirect('/host/host-home-list')
    }
    else {
      console.log(homeId, editing)
      res.render('host/edit-Home', { pageTitle: 'hostHomes', editing: editing , home:home,isLoggedIn:req.isLoggedIn,
     user: req.session.user})
    }
  })
}


exports.getDeleted = (req,res,next) =>{
  const homeId = req.params.homeId;
  homeClass.findByIdAndDelete(homeId)
  .then(()=>{
     homeClass.find()
    .then((homes)=>{
      res.render('host/host-home-list',{addedHomes:homes,pageTitle:'host-home',isLoggedIn:req.isLoggedIn,
     user: req.session.user})
    })
    .catch((err)=>{
      console.log("Error occurs after deletion: ",err)
    })
    
  })
  .catch((err)=>{
    console.log(err)
  })
  }

exports.postEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const {home,email, location, image, price, phone, homeRules } = req.body;
  homeClass.findById(homeId).then((homes)=>{
  homes.Name = home;
  homes.Email= email;
  homes.Location= location;
  homes.Price= price;
  homes.Phone= phone;
  if(req.file){
    if(image){
      const imgPath = path.join(rootDir,'uploads',image);
      fs.unlink(imgPath);
    }
    homes.Img= image;
    if(homeRules){
      const homeRulePath = path.join(rootDir,'uploads',homeRules);
      fs.unlink(homeRulePath);
    }
    homes.homeRules= homeRules;
  }
  homes.save().then((result)=>{
    console.log("Successfully edited home.",result)
    res.render('host/home-add-Success', { pageTitle: 'Success' ,isLoggedIn:req.isLoggedIn,
     user: req.session.user})
  }).catch(err =>{console.log("Error while updating",err)})
  }).catch(err =>{console.log("Id for editing doesnot exist",err)})
}

exports.postAddHome = (req, res, next) => {
  const { home, email, location, price, phone } = req.body;
  const newHome = new homeClass({ 
  Name: home,
  Email: email,
  Location: location,
  Price: price,
  Phone: phone,
  Img: req.files.image[0].filename,
  homeRules: req.files.homeRules[0].filename
  })
  console.log("NEW HOME:", newHome);
  console.log("HOME RULE:", req.files.homeRules[0].filename);

  newHome.save().
  then((result)=>{
    console.log("Home added successfully: ",result)
    res.render('host/home-add-Success', { pageTitle: 'Success',isLoggedIn:req.isLoggedIn,
     user: req.session.user })
  }).catch((err)=>{
    console.log("Error occurs while home addition: ", err)
  })
  
}

exports.getHostHomeList = (req, res, next) => {
  homeClass.find().then((addedHomes)=>{ res.render('host/host-home-list', { addedHomes: addedHomes, pageTitle: 'host-home-list',isLoggedIn:req.isLoggedIn,
     user: req.session.user }) });
}