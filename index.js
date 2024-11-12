const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listing=require('./models/listings');
const methodOverride=require('method-override');
const engine= require('ejs-mate');
const expressError= require('./utils/expressError');
const wrapAsync = require('./utils/wrapAsync');
const lsitingRoute = require('./routes/listing');
const reviewRoute = require('./routes/review');
const port = 8080;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs', engine);

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// connection to mongooes
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/RentProperty');
}

main().catch(e=>console.log(e));

// Home Route
app.get('/',wrapAsync(async(req,res)=>{
    let data= await listing.find({});
    res.render("index.ejs",{data});
})) 

// Other routes
app.use('/listing',lsitingRoute);
app.use('/show/:listingId/review',reviewRoute);



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