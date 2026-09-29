const express = require('express');
const {getLogin,postLogin,postLogout,getSignUp,postSignUp} = require('../controllers/authController')

const authRouter = express.Router();


authRouter.get("/login",getLogin)
authRouter.get("/signUp",getSignUp)
authRouter.post("/login",postLogin)
authRouter.post("/logout",postLogout)
authRouter.post("/signUp",postSignUp)



exports.authRouter = authRouter;
