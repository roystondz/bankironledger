const accountModel = require("../models/account.model");

async function createAccountController(req,res){
    const user = req.user;
    console.log("User:", user);
    const account = await accountModel.create({
        userId: user._id,
    });

    return res.status(201).json({
        message: "Account created successfully",
        account
    });
}


async function getUserAccountsController(req,res){
    const user = req.user;
    const accounts = await accountModel.find({userId: user._id});
    return res.status(200).json({
        message: "Accounts retrieved successfully",
        accounts
    });
}

module.exports = {
    createAccountController,
    getUserAccountsController
}


