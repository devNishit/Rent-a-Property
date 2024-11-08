const Joi = require('joi');

const joischema = Joi.object({
    title:Joi.string().min(1).required(),
    description:Joi.string().min(1).required(),
    image:Joi.string().min(1).required(),
    country:Joi.string().min(1).required(),
    location:Joi.string().min(1).required(),
    price:Joi.number().min(0).required()
})

module.exports = joischema;