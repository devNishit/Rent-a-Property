const {reviewSchema} = require('../utils/joischema');
const expressError= require('../utils/expressError');

const reviewValidastion = async(req,res,next)=>{
  
    try
    {
      await reviewSchema.validateAsync(req.body['review']);
      next();
    } catch(e){
    next(new expressError(500,e.details.map(detail => detail.message).join(', ')));
    
  }
    
  }

  module.exports = reviewValidastion;