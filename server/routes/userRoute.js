import express from "express";
import { register } from "../controller/userController";

const router = express.Router()

router.post("/register",register)

export {router};
