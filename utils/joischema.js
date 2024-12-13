const Joi = require('joi');

const listingSchema = Joi.object({
    title:Joi.string().min(1).required(),
    description:Joi.string().min(1).required(),
    // image:Joi.string().min(1).required(),
    country:Joi.string().min(1).required(),
    location:Joi.string().min(1).required(),
    price:Joi.number().min(0).required()
})

module.exports.listingSchema = listingSchema;

const reviewSchema = Joi.object({
    msg:Joi.string().min(1).required(),
    rating:Joi.number().min(1).max(5).required()
})

module.exports.reviewSchema = reviewSchema;
