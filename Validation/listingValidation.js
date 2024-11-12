const {listingSchema} = require('../utils/joischema');
const expressError= require('../utils/expressError');

const listingValidastion = async(req,res,next)=>{
  
    try
    {
      await listingSchema.validateAsync(req.body['list']);
      next();
    } catch(e){
    next(new expressError(500,e.details.map(detail => detail.message).join(', ')));
    
  }
    
  }

  module.exports = listingValidastion;