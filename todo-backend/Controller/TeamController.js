const jwt=require("jsonwebtoken");
const User=require("./../Model/User")
const {roleChecker}=require("./../utils/validate")

exports.getTeams=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_secret);
        const validated= await roleChecker("Manager",decoded);
        if(!validated|| !decoded){
            return res.status(401).json({
                status:"Unauthorized"
        })}

        const teams=await User.find({Team:{$ne:null}});

        const Teams=teams.map(el=>{
           return el.Team
        })
        const uniqueTeamNames = [...new Set(Teams)];
        res.status(200).json({
            status:"Success",
            Teams:uniqueTeamNames
        })
        next();
    }
    catch(err){
        res.status(501).json({status:"Failed"})
        console.log(err);
    }
}
exports.createTeam=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_secret);
        const validated= await roleChecker("Manager",decoded);
        if(!validated|| !decoded){
            return res.status(401).json({
                status:"Unauthorized"
            })
        }
        const name=req.body.name;
        const EmployeeID=req.body.EmployeeID;
        const team=await User.findOneAndUpdate({EmployeeID},{Team:name});
        res.status(201).json({
            message:"Team created successfully",
            team:team
        })
        next();
    }

    catch(err){
        res.status(501).json({
            status:"Failed"
        })
        console.log(err);

    }
}

exports.getTeam=async(req,res,next)=>{
    try{
        const Team=req.query.id;
        const TeamData=await User.find({Team});

        res.status(200).json({
            status:"Success",
            TeamData
        })

        next();
    }
    catch(err){
        res.status(501).json({
            status:"Failed"
        })
        console.log(err);
    }
}

exports.deleteTeams=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_secret);
        const validated= await roleChecker("Manager",decoded);
        if(!validated|| !decoded){
            return res.status(401).json({
                status:"Unauthorized"
            })
        }
        const Team=req.query.id;
        const TeamData=await User.updateMany({Team},{Team:null});

        res.status(200).json({
            status:"Success",
            TeamData
        })

        next();
    }
    catch(err){
        res.status(501).json({
            status:"Failed"
        })
        console.log(err);
    }

}