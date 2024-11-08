const joiSchema = require('../utils/joischema');
const expressError= require('../utils/expressError');

const joiValidastion = async(req,res,next)=>{
  
    try
    {
      await joiSchema.validateAsync(req.body['list']);
      next();
    } catch(e){
    next(new expressError(500,e.details.map(detail => detail.message).join(', ')));
    }
    
  }

  module.exports = joiValidastion;