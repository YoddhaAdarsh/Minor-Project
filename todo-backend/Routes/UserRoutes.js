const express=require("express");
const router=express.Router();
const UserController=require("./../Controller/UserController");
const authController=require("./../Controller/authController")
router.route("/signup").post(UserController.createUser);
router.route("/login").post(authController.loginHandler);
router.route("/profile").get(UserController.showProfile);
module.exports=router;