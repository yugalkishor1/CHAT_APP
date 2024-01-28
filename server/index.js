import { Server } from "socket.io";
import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userModel } from "../model/userModel.js";
import userRouter from "./routes/userRoute.js"
dotenv.config();


const port = process.env.PORT || 3000;
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors())
app.use("/api/auth",userRouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log("mongodb connection error",err);
})
    


app.get("/",function(req,res){
    res.send("welcome to the server")
})

app.listen(port,function(){
    console.log(`listeing to the port ${port}`);
})