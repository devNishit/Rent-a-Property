const express = require('express');
const router = express.Router();
const user=require('../models/users');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const userController = require('../controller/user');


// Passport config
passport.use(user.createStrategy());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//Registration form
router.get('/register', userController.registrationForm)

//register
router.post('/register',wrapAsync ( userController.register ))


//Login form
router.get('/login', userController.loginForm)

// authetication middelwere
const authetication = passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login'
})

//login
router.post('/login',authetication,userController.login)

//logout
router.get('/logout',userController.logout)


module.exports = router;

