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
        path:String,
        filename:String
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
    owner:{

            type:"ObjectId",
            ref:"user" 

             },

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