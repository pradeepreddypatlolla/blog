const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const isAuthorized=async function(req,res,next){

    try {
        const {token}=req.cookies
       // console.log(tok);
        if(!token){
           // console.log(error)
           return res.status(500).render('error',{error:"Please Login first"})
            // return res.status(400).json({
            //     success:false,
            //     message:"Please Login"
            // })
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
       // console.log("decoded:"+decoded._id);
        req.user =await User.findById(decoded._id)
       // req.user=user
       // console.log(JSON.stringify(req.user));
        next()
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }





}

module.exports=isAuthorized