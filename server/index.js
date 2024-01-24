import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin:"http://localhost:5173/",
    method:"GET POST",
    credentials:true
}))

app.get("/",function(req,res){
    res.send("hello")
})

app.listen(port,function(){
    console.log(`server is listeing in ${port}`);
})
