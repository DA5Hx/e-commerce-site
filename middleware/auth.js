const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')

const auth = async (req,res,next)=>{
    const {authorization }= req.headers;
    if(!authorization)
        res.status(401).json({err:'Authorization token required'});

    const token= authorization.split(' ')[1];
    
    try{
        const {_id} = jwt.verify(token,process.env.SECRET);
        
        req.user = await userModel.findOne({_id}).select('_id');
        next();

    }catch(err){
        res.status(401).json({err:'Authorization token invalid'});
    }
}

module.exports= auth;