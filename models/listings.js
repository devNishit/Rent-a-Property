const mongoose = require('mongoose');

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

});


const listing = mongoose.model('listing',listingSchema);

module.exports=listing;