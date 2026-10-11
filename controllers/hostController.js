const  homeClass = require("../model/home");
const fs = require('fs');
const path = require('path')
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


exports.postEditHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const { home, email, location, price, phone } = req.body;

    console.log("Received files:", req.files);

    const homes = await homeClass.findById(homeId);

    if (!homes) {
      return res.status(404).send("Home not found");
    }

    homes.Name = home;
    homes.Email = email;
    homes.Location = location;
    homes.Price = price;
    homes.Phone = phone;

    const oldImage = homes.Img;
    const oldRules = homes.homeRules;

    if (req.files?.image?.[0]) {
      homes.Img = req.files.image[0].filename;
    }

    if (req.files?.homeRules?.[0]) {
      homes.homeRules = req.files.homeRules[0].filename;
    }

    await homes.save();

    console.log("Database updated successfully");

    if (req.files?.image?.[0] && oldImage) {
      const imgPath = path.join(rootDir, "uploads", oldImage);

      try {
        await fs.promises.unlink(imgPath);
        console.log("Old image deleted successfully");
      } catch (err) {
        console.log("Old image deletion error:", err.message);
      }
    }

    if (req.files?.homeRules?.[0] && oldRules) {
      const rulePath = path.join(rootDir, "uploads", oldRules);

      try {
        await fs.promises.unlink(rulePath);
        console.log("Old PDF deleted successfully");
      } catch (err) {
        console.log("Old PDF deletion error:", err.message);
      }
    }

    return res.render("host/home-add-Success", {
      pageTitle: "Success",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    });

  } catch (err) {
    console.error("Error while editing home:", err);

    if (!res.headersSent) {
      return res.status(500).send("Unable to update home");
    }
  }
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