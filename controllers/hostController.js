const  homeClass = require("../model/home");


exports.getAddHome = (req, res, next) => {
  const editing = req.query.editing === 'true';
  res.render('host/edit-Home', { pageTitle: 'newHome', editing: editing })
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
      res.render('host/edit-Home', { pageTitle: 'hostHomes', editing: editing , home:home})
    }
  })
}


exports.getDeleted = (req,res,next) =>{
  const homeId = req.params.homeId;
  homeClass.deleteData(homeId)
  .then(()=>{
     homeClass.find()
    .then((homes)=>{
      res.render('host/host-home-list',{addedHomes:homes,pageTitle:'host-home'})
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
  const {home,email, location, image, price, phone } = req.body;
  homeClass.findById(homeId).then((homes)=>{
  homes.Name = home;
  homes.Email= email;
  homes.Location= location;
  homes.Price= price;
  homes.Phone= phone;
  homes.Img= image;
  homes.save().then((result)=>{
    console.log("Successfully edited home.",result)
    res.render('host/home-add-Success', { pageTitle: 'Success' })
  }).catch(err =>{console.log("Error while updating",err)})
  }).catch(err =>{console.log("Id for editing doesnot exist",err)})
}

exports.postAddHome = (req, res, next) => {
  const { home, email, location, image, price, phone } = req.body;
  const newHome = new homeClass({ Name: home,
  Email: email,
  Location: location,
  Price: price,
  Phone: phone,
  Img: image})
  newHome.save().then((result)=>{
    console.log("Home added successfully: ",result)
    res.render('host/home-add-Success', { pageTitle: 'Success' })
  }).catch((err)=>{
    console.log("Error occurs while home addition: ", err)
  })
  
}

exports.getHostHomeList = (req, res, next) => {
  homeClass.find().then((addedHomes)=>{ res.render('host/host-home-list', { addedHomes: addedHomes, pageTitle: 'host-home-list' }) });
}