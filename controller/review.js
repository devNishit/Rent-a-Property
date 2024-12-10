const listing=require('../models/listings');
const review=require('../models/reviews');


//Add new Review
module.exports.addReview = async (req,res)=>{
    let {listingId} = req.params;
    let reviewData = req.body['review'];
    let newReview = new review(reviewData);

    // add currUser info
    newReview.owner = req.user;
    await newReview.save();

    // Add review in listing
   await listing.findByIdAndUpdate(listingId,{$push:{review:newReview}});

   //sucees flashMag
   req.flash('success','Review Added');
   res.redirect(`/listing/show/${listingId}`);
}

//Delete Review
module.exports.destroyReview = async (req,res)=>{
    let{listingId,id} = req.params;
    
    // find owner id and compare it to currUser
    let revOwner = await review.findById(id).populate('owner');
   
    if(req.user && String(revOwner.owner._id) == String(req.user._id ))
        {

        await review.findByIdAndDelete(id);
   let temp= await listing.findByIdAndUpdate(listingId,{$pull:{review:id}});
    // console.log(temp);

    // flash message
    req.flash('success','Review Deleted');
   res.redirect(`/listing/show/${listingId}`);
    } else{
        req.flash("error","You Not have permission to delete review");
        res.redirect(`/listing/show/${listingId}`);
    }

    
}