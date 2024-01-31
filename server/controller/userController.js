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

        const salt = await bcrypt.genSalt(10);
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

const login = async(req,res,next) => {
    console.log(req.body);
    try {
        
        const data = req.body;
        if(data.password==""){
            res.json({status:false,message:"password is required"})
        }

        const user = await userModel.findOne({username:data.username})
        const passwordMatch = await bcrypt.compare(data.password,user.password)

        const userResponse = user.toObject();
        delete userResponse.password
        if(passwordMatch){
            res.json({userResponse,status:true})
        }else{
            res.json({message:"incorrect Password", status:false})
        }

    } catch (error) {
        res.json({message:error.message})
    }
};

module.exports = { register,login };
