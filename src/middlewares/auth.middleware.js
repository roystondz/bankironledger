const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken"); 
const Blacklist = require("../models/blacklist.model");

async function authMiddleware(req,res,next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access , Token is required"
        })
    }

    const isBlacklisted = await Blacklist.find({token})
    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized Access , Token is blacklisted"
        })
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded.id });
        if(!user){
            return res.status(401).json({
                message:"Unauthorized Access , Invalid Token"
            })
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized Access , Invalid Token"
        })
    }
}

async function systemUserMiddleware(req,res,next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access , Token is required"
        })
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded.id }).select("+systemUser");
        if(!user.systemUser){
            return res.status(403).json({
                message:"Forbidden Access , System user is required"
            })
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized Access , Invalid Token"
        })
    }
}


module.exports = {
    authMiddleware,
    systemUserMiddleware
}
