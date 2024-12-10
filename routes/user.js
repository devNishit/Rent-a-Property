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


//register
router.route('/register')
.get( userController.registrationForm)
.post(wrapAsync ( userController.register ))

// authetication middelwere
const authetication = passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login'
})

//login
router.route('/login')
.get( userController.loginForm)
.post(authetication,userController.login)

//logout
router.get('/logout',userController.logout)

module.exports = router;

