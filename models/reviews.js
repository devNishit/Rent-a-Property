const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    msg:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        required:true
    },
    owner:{
        type:"ObjectId",
        ref:"user" 
         },
});

const review = mongoose.model("review",reviewSchema);

module.exports = review;