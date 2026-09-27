

exports.getLogin = (req, res, next) => {
  res.render('authorization/login', { pageTitle: 'login', isLoggedIn:false})
}

exports.postLogin = (req, res, next) => {
  //res.cookie("isLoggedIn", "true");
   req.session.isLoggedIn = true;
  //  req.isLoggedIn = 'true';
  res.redirect('/')
}
exports.postLogout = (req, res, next) => {
   res.session.destroy((err)=>{
    if(err){
      console.log("Error occur while destroying session :",err)
    }
    else{
      res.redirect('/login')
    }
   });
  //  req.isLoggedIn = 'true';
  
}
