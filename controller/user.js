const user=require('../models/users');

//Registration form
module.exports.registrationForm = (req,res)=>{
    res.render('./user/register.ejs');
    console.log("afterLogin",res.locals.redirectUser);
}

//register
module.exports.register = async (req,res)=>{
    try{

    const {email,username,password} = req.body;
    const newUser = new user({email:email, username:username});
    const finalUser = await user.register(newUser,password);

    // auto login after register
    req.login(finalUser,(e)=>{
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
}

// login form
module.exports.loginForm = (req,res)=>{
    res.render('./user/login.ejs');
}

//login
module.exports.login = (req,res)=>{
    const redirect = res.locals.redirectUser || '/';
        res.redirect(redirect);
}

//logout
module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err)}
        res.redirect('/');
    })
}