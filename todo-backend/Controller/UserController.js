const User=require('./../Model/User');
const jwt=require("jsonwebtoken")

exports.createUser=async(req,res,next)=>{
    try{
        const user=await User.create(req.body);
         res.status(200).json({
            success:true,
            data:user
        })
        next();
    }
    catch(err){
        console.log(err);
    }
    
}

exports.showProfile=async (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const email=jwt.decode(token,process.env.JWT_Secret);
        const user=await User.findOne({Email:email});
        res.status(200).json({success:true,data:user});
        next();
    }
    catch(err){
        console.log(err);
    }
}