const { homeClass, addedHomes } = require("../model/home");


exports.getAddHome = (req, res, next) => {
  const editing = req.query.editing === 'true';
  res.render('host/edit-Home', { pageTitle: 'newHome', editing: editing })
}
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  homeClass.findByID(homeId, (home) => {
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
  homeClass.deleteData(homeId,(homes =>{
    res.render('host/host-home-list',{pageTitle:'host-home',addedHomes:homes})
  }))
}




exports.postEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const { home, email, location, image, price, phone } = req.body;
  const newHome = new homeClass(home, email, location, image, price, phone)
  newHome.id = homeId;
  newHome.save()
  res.render('host/home-add-Success', { pageTitle: 'Success' })
}

exports.postAddHome = (req, res, next) => {
  const { home, email, location, image, price, phone } = req.body;
  const newHome = new homeClass(home, email, location, image, price, phone)
  newHome.save()
  res.render('host/home-add-Success', { pageTitle: 'Success' })
}

exports.getHostHomeList = (req, res, next) => {
  homeClass.fetchData(addedHomes => { res.render('host/host-home-list', { addedHomes: addedHomes, pageTitle: 'host-home-list' }) });
}