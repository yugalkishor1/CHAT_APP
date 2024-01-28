const express = require("express");
const { register } = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.get("/register",(req,res)=>{
    res.send("hello")
})
userRouter.post("/register", register);

module.exports =  userRouter ;
