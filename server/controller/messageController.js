const messageModel = require("../model/messageModel.js")

const addMessage = async(req,res) => {

    const {message,from,to} = req.body;

    try {
        const data = await messageModel.create({
            message:{
                text:message,
                users:[from,to],
                sender:from
            }
        })
     
        if(data){
            return res.json({status:true,message:"messaged successfully added"});
        }else{
             res.json({status:false,message:"failed to add message to the database"});
        }

    } catch (error) {
        res.json(error.message)
    }
}

const getAllMessage = async(req,res) => {

    const {from,to} = req.body;

    try {
       const messages = await messageModel.find({"message.users":{$all:[from,to]}}).sort({updatedAt:1})

       const projectMessages = messages.map((msg)=>{
        return {
            fromSelf: msg.message.sender.toString()===from,
            message: msg.message.text
        }
       })

       return res.json(projectMessages)
       
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {addMessage,getAllMessage}