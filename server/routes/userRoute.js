const express = require("express");
const { register,login , setavatar,getAllUsers} = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setavatar/:id", setavatar);
userRouter.get("/allusers/:id", getAllUsers);

module.exports =  userRouter ;
