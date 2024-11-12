const mongoose = require('mongoose');
const review=require('./reviews');

const listingSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        // set:(e)=>{if(e===""){e="https://pixabay.com/photos/door-stairs-window-facade-shutters-8029228/"}},
        default:"https://pixabay.com/photos/school-house-building-desert-6982073/"
    },
    country:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

    review:
        [
            { 
              type:"ObjectId",
              ref:"review"
            }
        ],
    

});


// Delete all review after delete the listing
listingSchema.post('findOneAndDelete', async(data,next)=>{
   
    for (const rev of data['review'])
     { 
        await review.findByIdAndDelete(rev);
     };
    next();
})


const listing = mongoose.model('listing',listingSchema);

module.exports=listing;