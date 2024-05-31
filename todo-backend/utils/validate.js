const User=require('./../Model/User');

exports.roleChecker=async (role,email)=>{
    const user=await User.findOne({Email:email});
    if(user.Role===role){
        return true;
    }

}
