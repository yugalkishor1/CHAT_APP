const express = require("express")
const {addMessage,getAllMessage} = require("../controller/messageController.js")


const messageRoute = express.Router()

messageRoute.post("/sendMessage",addMessage)
messageRoute.post("/getMessages",getAllMessage)


module.exports = messageRoute