const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendRegistrationMail } = require("../services/email.service");

async function userRegisterController(req,res){
    const {email,name,password} = req.body;

    if(!email || !name || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
        return res.status(422).json({message:"User already exists"});
    }

    const user = await userModel.create({email,name,password});
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token);
     res.status(201).json({message:"User registered successfully",user:{
        _id:user._id,
        name:user.name,
        email:user.email
    },token});
    
    await sendRegistrationMail(user.email,user.name);
}

async function userLoginController(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    return res.status(200).json({message:"User logged in successfully",user:{
        _id:user._id,
        name:user.name,
        email:user.email
    },token});
}

module.exports = {
    userRegisterController,
    userLoginController
}