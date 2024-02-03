const express = require("express");
const { register,login , setavatar} = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setavatar/:id", setavatar);

module.exports =  userRouter ;
