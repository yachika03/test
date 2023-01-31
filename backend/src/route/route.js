const express=require("express");
const router=express.Router();
const{createUser,updateUser,loginUser,getUser}=require("../controller/userController.js")
const{authentication}=require("../middlware/auth")
router.post("/register",createUser)
router.post("login",loginUser)
router.post("/user/:userId",authentication,updateUser)
router.get("/getUser/:userId",authentication,getUser)

module.exports=router