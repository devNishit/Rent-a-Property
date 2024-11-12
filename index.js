const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listing=require('./models/listings');
const review=require('./models/reviews');
const methodOverride=require('method-override');
const engine= require('ejs-mate');
const expressError= require('./utils/expressError');
const wrapAsync = require('./utils/wrapAsync');
const listingValidastion = require('./Validation/listingValidation');
const reviewValidastion = require('./Validation/reviewValidation');
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
    let reviewList=[];

    // fetch reviews
    for(rev of data.review){
        let data = await review.findById(rev);
        console.log(data);
        reviewList.push(data);
    }
    
    res.render('show.ejs',{data,reviewList});
}))

// Edit Listing
app.get('/edit/:id',wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);
    res.render('edit.ejs',{data});
}))

app.put('/edit/:id',listingValidastion, wrapAsync (async(req,res)=>{
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

// Add new Review
app.post('/show/:listingId/review/add', reviewValidastion, wrapAsync(async (req,res)=>{
    let {listingId} = req.params;
    let reviewData = req.body['review'];
    let newReview = new review(reviewData);
    await newReview.save();

    // Add review in listing
   await listing.findByIdAndUpdate(listingId,{$push:{review:newReview}});
   res.redirect(`/show/${listingId}`);
}))

//Delete the Review
app.delete('/show/:listingId/review/:id', wrapAsync(async (req,res)=>{
    let{listingId,id} = req.params;
    await review.findByIdAndDelete(id);
   let temp= await listing.findByIdAndUpdate(listingId,{$pull:{review:id}});
    console.log(temp);
   res.redirect(`/show/${listingId}`);
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
