const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message:{
        text:{
            type:String,
            required:true
        },
        users:Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"userModel",
            required:true
        }
    }
},{ timestamps:true})

const messageModel = mongoose.model("messageModel",messageSchema)

module.exports = messageModel