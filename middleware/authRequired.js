const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req,res,next)=>{
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader === 'undefined'){
            return res.sendStatus(403).json({status:403,message:"not logged in"});
        }

        const token = bearerHeader.split(" ")[1];
        const payload = await jwt.verify(token,process.env.SECRET);
        req.userId = payload._id;
        next();
        
    }catch(err){
        console.log(err)
        return res
        .status(500)
        .json({
            status:500,
            message:"Internal Server Error"
        })
    }
}