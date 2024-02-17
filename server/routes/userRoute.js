const express = require("express");
const { register,login,setavatar,getAllUsers,getUserBySearch } = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setavatar/:id", setavatar);
userRouter.get("/allusers/:id", getAllUsers);
userRouter.post("/getUserBySearch/:id", getUserBySearch);

module.exports =  userRouter ;
