const express = require('express');
const router = express.Router({mergeParams:true});
const listing=require('../models/listings');
const review=require('../models/reviews');
const wrapAsync = require('../utils/wrapAsync');
const reviewValidastion = require('../Validation/reviewValidation');

// Add new Review
router.post('/add', reviewValidastion, wrapAsync(async (req,res)=>{
    let {listingId} = req.params;
    let reviewData = req.body['review'];
    let newReview = new review(reviewData);
    await newReview.save();

    // Add review in listing
   await listing.findByIdAndUpdate(listingId,{$push:{review:newReview}});

   //sucees flashMag
   req.flash('success','Review Added');
   res.redirect(`/listing/show/${listingId}`);
}))

//Delete the Review
router.delete('/:id', wrapAsync(async (req,res)=>{
    let{listingId,id} = req.params;
    await review.findByIdAndDelete(id);
   let temp= await listing.findByIdAndUpdate(listingId,{$pull:{review:id}});
    console.log(temp);

    // flash message
    req.flash('success','Review Deleted');
   res.redirect(`/listing/show/${listingId}`);
}))

module.exports = router;