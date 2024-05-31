const express=require("express");
const router=express.Router();
const TeamController=require("./../Controller/TeamController");

router.route("/").post(TeamController.createTeam).get(TeamController.getTeams);
router.route("/getTeam").get(TeamController.getTeam)
module.exports=router;
