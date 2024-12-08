// const { required } = require('joi');
const mongoose = require('mongoose');
const localMongoose = require('passport-local-mongoose');

const userSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

})

userSchema.plugin(localMongoose,{ usernameField: "email" });

const user = mongoose.model('user',userSchema);

module.exports = user;