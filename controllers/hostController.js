const  homeClass = require("../model/home");
const fs = require('fs');
const path = require("../util/path");
const rootDir = require('../util/path');


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
  console.log("1. Request received");

  const homeId = req.params.homeId;
  const { home, email, location, price, phone } = req.body;

  console.log("2. Home ID:", homeId);
  console.log("3. Files:", req.files);

  homeClass.findById(homeId)
    .then((homes) => {
      console.log("4. Home found:", !!homes);

      if (!homes) {
        return res.status(404).send("Home not found");
      }

      homes.Name = home;
      homes.Email = email;
      homes.Location = location;
      homes.Price = price;
      homes.Phone = phone;

      if (req.files?.image?.[0]) {
        console.log("5. Updating image");
        homes.Img = req.files.image[0].filename;
      }

      if (req.files?.homeRules?.[0]) {
        console.log("6. Updating PDF");
        homes.homeRules = req.files.homeRules[0].filename;
      }

      console.log("7. Saving home");

      return homes.save()
  .then((result) => {
    console.log("8. Save successful:", result._id);
    return result;
  })
  .catch((err) => {
    console.error("SAVE FAILED:", err);
    throw err;
  });
    })
    .then((result) => {
      if (!result) return;

      console.log("8. Database save successful");

      return res.render("host/home-add-Success", {
        pageTitle: "Success",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });
    })
    .catch((err) => {
      console.error("EDIT ERROR:", err);

      if (!res.headersSent) {
        res.status(500).send("Home update failed");
      }
    });
};

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