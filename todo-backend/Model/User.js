const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:[true,"An Employee Must have a name"]
    },

    Email:{
        type:String,
        require:[true,"An Employee must have an email"],
        unique:true
    },

    Password:{
        type:String,
        require:true,
        select:false
    },

    Role:{
        type:String,
        enum:["Employee","Team Lead","Manager"]
    },

    EmployeeID:{
        type:String
    },

    Team:{
        type:String
    },

    TaskId:[{
        type:mongoose.Types.ObjectId,
        ref:"Task"
    }]

})

userSchema.methods.checkPassword=function(password,orginalPassword){
    return password===orginalPassword;
}

const userModel=mongoose.model("user",userSchema,"user");

module.exports=userModel;