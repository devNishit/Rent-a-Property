const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listing=require('./models/listings');
const methodOverride=require('method-override');
const engine= require('ejs-mate');
const expressError= require('./utils/expressError');
const wrapAsync = require('./utils/wrapAsync');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash= require('express-flash');
const passport = require('passport');

const lsitingRoute = require('./routes/listing');
const reviewRoute = require('./routes/review');
const userRoute = require('./routes/user');
const port = 8080;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs', engine);

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());

// connection to mongooes
const mongoDb = process.env.MONGO_DB
async function main(){
    mongoose.connect(mongoDb);
}

main().catch(e=>console.log(e));


// Session
const store = mongoStore.create({
    mongoUrl:mongoDb,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})

const sessionInfo ={
    store,
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized: false,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
    }

}

app.use(session(sessionInfo));

// passport
app.use(passport.initialize());
app.use(passport.session());


// Midderware for flashMsg and UserInfo
app.use((req,res,next)=>{
    //flashMsg
    res.locals.successMsg=req.flash('success');
    res.locals.failerMsg=req.flash('failer');
    res.locals.errorMsg=req.flash('error');

    //currUser
    res.locals.currUser=req.user;

    // redirect User
    res.locals.redirectUser=req.session.redirectUser;
    
    next();
})

// Home Route
app.get('/',wrapAsync(async(req,res)=>{
    if(req.query.q){
        // retune listing as user search
        let q = req.query.q;
        let data = await listing.find({
            $or:[
                {country:{$regex:q,$options:"i"}},
                {location:{$regex:q,$options:"i"}}
            ]
        });
        return res.render("index.ejs",{data});
    }

    if(req.query.category){
        // Return filtered listings as JSON
        let data= await listing.find({category:req.query.category});
        return res.json(data);
    }else{
        let data= await listing.find({});
        return res.render("index.ejs",{data});
    }
}));


// Other routes
app.use('/listing',lsitingRoute);
app.use('/show/:listingId/review',reviewRoute);
app.use('/',userRoute);

// 404 Error
app.all('*',(req,res,next)=>{
    throw new expressError(404,"Page Not Found!");
})

// Error handling
app.use((err,req,res,next)=>{
    statusCode= err.statusCode || 500;
    message = err.message || "Server error";
    res.status(statusCode).render("error.ejs",{message});
    next(err);
})

// Server Port
app.listen(port,()=>{
    console.log("Connected to server");
})