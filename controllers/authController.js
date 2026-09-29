const{check, validationResult} = require('express-validator')

exports.getLogin = (req, res, next) => {
  res.render('authorization/login', { pageTitle: 'login', isLoggedIn:false})
}

exports.postLogin = (req, res, next) => {
   req.session.isLoggedIn = true;
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
}
exports.getSignUp = (req, res, next) => {
  res.render('authorization/SignUp', { pageTitle: 'SignUp', isLoggedIn:false,
    errors:[],
    oldInput:{
            firstName:'',
            lastName:"",
            userName:"",
            password:""
          }})
}
exports.postSignUp = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({min:2})
    .withMessage('First name must be atleast 2 character long ')
    .matches(/^[a-zA-Z\s]+s/)
    .withMessage('First name can only contains letters'),

     check('lastName')
    .trim()
    .matches(/^[a-zA-Z\s]+s/)
    .withMessage('Last name can only contains letters'),

     check('userName')
     .trim()
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),

    check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:8})
    .withMessage('Password must be atleast 8 character long ')
    .matches(/[a-z]/)
    .withMessage('Password should contains small letters')
    .matches(/[A-Z]/)
    .withMessage('Password should contains capital letters')
    .matches(/[! @ # $ % ^ & * ( ) < > , . : " ; ' { }]/)
    .withMessage('Password should contains special characters')
    .trim(),

    check('confirmPassword')
    .trim()
    .custom((value,{req}) =>{
      if(value !== req.body.confirmPassword){
        throw new Error('Password did not match');
      }
      return true;
    }),
    
    check('userType')
    .notEmpty()
    .withMessage('User type must be there')
    .isIn(['guest','host'])
    .withMessage('Invalid user type'),

    check('termsAccepted')
    .notEmpty()
    .withMessage('You must accept the terms and conditions')
    .custom((value)=>{
      if(value !== 'true'){
        throw new Error("You should accept the terms and conditions.")
      }
      return true;
    }),

    (req, res, next) => {
      const {firstName, lastName, userName, password, confirmPassword, userType, termsAccepted} = req.body;
      const error = validationResult(req);
      if(!error.isEmpty()){
        return res.status(422).render('authorization/signUp',{
          pageTitle:'SignUp',
          isLoggedIn:false,
          errors: error.array().map(error => error.msg),
          oldInput:{
            firstName,
            lastName,
            userName,
            password
          }
        })
      }
      res.redirect('/login')
    }
]


