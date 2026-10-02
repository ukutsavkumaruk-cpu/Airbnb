exports.pageNotFound = (req,res,next)=>{
  res.render('404',{pageTitle:'error', isLoggedIn: req.isLoggedIn ,
     user: req.session.user})
}