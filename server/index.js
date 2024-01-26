import { Server } from "socket.io";
import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express()

app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log("mongodb connection error",err);
})
    



app.get("/",function(req,res){
    res.send("hello")
})

app.listen(port,function(){
    console.log(`listeing to the port ${port}`);
})