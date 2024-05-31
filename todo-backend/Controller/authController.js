const user =require("./../Model/User");
const jwt=require("jsonwebtoken");
exports.loginHandler=async(req,res,next)=>{
    const {email,password}=req.body;
    const User=await user.findOne({Email:email}).select('+Password');
    if(!User){
        return res.status(404).json({
           status:"Failed" 
        })
    }

    const authenticated=User.checkPassword(password,User.Password);
    if(!authenticated){
        return res.status(401).json({
            status:"unauthorized"
        })
    }

    const token=jwt.sign(email,process.env.JWT_Secret);
        res.status(200).json({
            status:"Success",
            token:token,
            role:User.Role
        })

    next()
}