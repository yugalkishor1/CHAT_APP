const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { userModel } = require("./model/userModel.js");
const userRouter = require("./routes/userRoute.js");
const messageRouter = require("./routes/messageRoute.js");
const socket = require("socket.io")

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use("/api/auth", userRouter);
app.use("/api/chat", messageRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongodb connected successfully");
    })
    .catch((err) => {
        console.log("mongodb connection error", err);
    });

app.get("/", function (req, res) {
    res.send("welcome to the server");
});

const server = app.listen(port, function () {
     console.log(`listeing to the port ${port}`);
});

const io = socket(server,{
    cors:{
        origin:"*",
        credentials:true
    }
})

global.onlineUser = new Map();

io.on("connection",(socket)=>{
    console.log("connected");

    socket.on("add-user",(userId)=>{
        // console.log(userId);
        onlineUser.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUser.get(data.to)
        socket.to(sendUserSocket).emit("recive-msg",data.msg)
    })
   
})
