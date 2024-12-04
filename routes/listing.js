const express = require('express');
const router = express.Router();
const listing=require('../models/listings');
const review=require('../models/reviews');
const wrapAsync = require('../utils/wrapAsync');
const listingValidastion = require('../Validation/listingValidation');



// Show listing
router.get('/show/:id', wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);

    // failer flash msg
    if(!data){
        req.flash('failer','Listing not found');
        res.redirect('/');
    }

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
router.get('/edit/:id',wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);

    // failer flash msg
    if(!data){
        req.flash('failer','Listing not found');
        res.redirect('/');
    }

    res.render('edit.ejs',{data});
}))

router.put('/edit/:id',listingValidastion, wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let newData = req.body['list'];
    let update = await listing.findByIdAndUpdate(id,newData,{runValidators: true});
    console.log(update);
    req.flash('success','Listing successfully edited')
    res.redirect(`/listing/show/${id}`);
}))

// Delete Listing
router.delete('/delete/:id', wrapAsync (async(req,res)=>{
    let {id}= req.params;
    let del = await listing.findByIdAndDelete(id);
    console.log(del);
    req.flash('success','Listing successfully deleted')
    res.redirect("/");
}))

// Add new listing
router.get('/add',wrapAsync ((req,res)=>{
    res.render("add.ejs");
}))

router.post('/add',wrapAsync (async (req,res)=>{
    let formData = req.body['list']
    let newList= new listing(formData);
    await newList.save();
    req.flash('success','New listing successfully Added');
    res.redirect("/");
}))

module.exports = router;