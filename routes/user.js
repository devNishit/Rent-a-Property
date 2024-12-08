const express = require('express');
const router = express.Router();
const user=require('../models/users');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');




passport.use(user.createStrategy());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//register

router.get('/register',(req,res)=>{
    res.render('./user/register.ejs');
    console.log("afterLogin",res.locals.redirectUser);
})

router.post('/register',wrapAsync ( async (req,res)=>{
    try{

    const {email,username,password} = req.body;
    const newUser = new user({email:email, username:username});
    await user.register(newUser,password);

    // auto login after register
    req.login(newUser,(e)=>{
        if(e){
            req.flash('error','Somthing went wrong');
          return  res.redirect('/login');
        }
        req.flash("success","Signup successful!")
      res.redirect('/');
    })

    

    } catch(e){
        req.flash("failer",e.message);
        res.redirect('/register');
    }
}))


//login
router.get('/login',(req,res)=>{
    res.render('./user/login.ejs');
})

// authetication middelwere
const authetication = passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login'
})

router.post('/login',authetication,(req,res)=>{
    const redirect = res.locals.redirectUser || '/';
        res.redirect(redirect);
})

//logout
router.get('/logout',(req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err)}
        res.redirect('/');
    })
})


module.exports = router;

