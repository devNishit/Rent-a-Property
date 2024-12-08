const express = require('express');
const router = express.Router();
const listing=require('../models/listings');
const review=require('../models/reviews');
const wrapAsync = require('../utils/wrapAsync');
const listingValidastion = require('../Validation/listingValidation');
const passport = require('passport');
const {isAuth,isOwner} = require('../middleware.js');



// Show listing
router.get('/show/:id', wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id).populate('owner');
    
    // get listing ownerId
    req.session.listingOwner = data.owner._id;


    // failer flash msg
    if(!data){
        req.flash('failer','Listing not found');
        res.redirect('/');
    }

    let reviewList=[];

    // fetch reviews
    for(rev of data.review){
        let data = await review.findById(rev).populate('owner');
        reviewList.push(data);
    }
    
    // console.log(reviewList);
    res.render('show.ejs',{data,reviewList});
    
}))

// Edit Listing
router.get('/edit/:id',isOwner, wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);

    // failer flash msg
    if(!data){
        req.flash('failer','Listing not found');
        res.redirect('/');
    }

    res.render('edit.ejs',{data});
}))

router.put('/edit/:id',isOwner,listingValidastion, wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let newData = req.body['list'];
    let update = await listing.findByIdAndUpdate(id,newData,{runValidators: true});
    console.log(update);
    req.flash('success','Listing successfully edited')
    res.redirect(`/listing/show/${id}`);
}))

// Delete Listing
router.delete('/delete/:id', isOwner, wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let del = await listing.findByIdAndDelete(id);
    console.log(del);
    req.flash('success','Listing successfully deleted')
    res.redirect("/");
}))

// Add new listing
router.get('/add', isAuth, wrapAsync ((req,res)=>{
    res.render("add.ejs");
}))

router.post('/add',isAuth,wrapAsync (async (req,res)=>{
    let formData = req.body['list']
    let newList= new listing(formData);

    // add currUser info
    newList.owner = req.user;
    await newList.save();
    req.flash('success','New listing successfully Added');
    res.redirect("/");
}))

module.exports = router;