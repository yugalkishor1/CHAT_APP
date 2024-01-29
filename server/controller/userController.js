const { userModel } = require("../model/userModel.js");
const bcrypt = require("bcrypt")


const register = async (req, res, next) => {
    const {username,email,password} = req.body;

    try {

        const checkUser = await userModel.findOne({username})
        if(checkUser) 
            return res.json({message:"User Already Exsit",status:false})
        const emailCheck = await userModel.findOne({email})
        if(emailCheck) 
            return res.json({message:"Email Already used",status:false})

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await userModel.create({
            username,email,password:hashedPassword
        })
            const userResponse = user.toObject();
            delete userResponse.password;
            return res.json({userResponse,status:true})
        
    } catch (ex) {
        next(ex)
    }
};

module.exports = { register };
