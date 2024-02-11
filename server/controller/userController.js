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

const setavatar = async (req,res,next) => {

    try {
        
        const userId = req.params.id;
        const image = req.body.image;

        console.log(userId);
        console.log(image);

        const user = await userModel.findByIdAndUpdate(userId,{
            isAvataeImageset:true,
            avtarImage:image
        })
        console.log(user);
       
        if(user){
            const userResponse = user.toObject()
            delete userResponse.password
            res.send({isSet:user.isAvataeImageset,image:user.avtarImage,userResponse,message:"Avatar set successfully"})
        }else{
            res.send({isSet:false, message:"ERROR:Something went wrong with Avatar setting, Please Try Again"})
        } 

    } catch (error) {
        res.json({status:true,message:error.message})
    }

}
const getAllUsers = async (req,res,next) => {
    try {
        const allusers = await userModel.find({_id:{$ne:req.params.id}})
        res.json(allusers)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = { register,login,setavatar,getAllUsers };