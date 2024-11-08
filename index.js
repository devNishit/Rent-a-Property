const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listing=require('./models/listings');
const methodOverride=require('method-override');
const engine= require('ejs-mate');
const expressError= require('./utils/expressError');
const wrapAsync = require('./utils/wrapAsync');
const joiValidastion = require('./Validation/joiValidation');
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

app.listen(port,()=>{
    console.log("Connected to server");
})

app.get('/',wrapAsync(async(req,res)=>{
    let data= await listing.find({});
    res.render("index.ejs",{data});
})) 

// Show listing
app.get('/show/:id', wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);
    res.render('show.ejs',{data});
}))

// Edit Listing
app.get('/edit/:id',wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);
    res.render('edit.ejs',{data});
}))

app.put('/edit/:id',joiValidastion, wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let newData = req.body['list'];
    let update = await listing.findByIdAndUpdate(id,newData,{runValidators: true});
    console.log(update);
    res.redirect(`/show/${id}`);
}))

// Delete Listing
app.delete('/delete/:id', wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let del = await listing.findByIdAndDelete(id);
    console.log(del);
    res.redirect("/");
}))

// Add new listing
app.get('/add',wrapAsync ((req,res)=>{
    res.render("add.ejs");
}))

app.post('/add',wrapAsync (async (req,res)=>{
    let formData = req.body['list']
    let newList= new listing(formData);
    await newList.save();
    res.redirect("/");
}))


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
