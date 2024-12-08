module.exports.isAuth = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUser = req.originalUrl;
        req.flash("error","You need to Login!");
        return res.redirect('/login');
    }
    next();
}

module.exports.isOwner = (req,res,next)=>{
    console.log("1st",req.session.listingOwner)
    if(req.user && (req.user._id) == (req.session.listingOwner)){
        return next();
    }
    console.log("2st",req.session.listingOwner)
    req.flash("error","You not have permistion");
    res.redirect('/');
}