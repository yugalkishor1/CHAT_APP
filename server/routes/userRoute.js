import express from "express";
import { register } from "../controller/userController";

const userRouter = express.Router()

router.post("/register",register)

export {userRouter}
