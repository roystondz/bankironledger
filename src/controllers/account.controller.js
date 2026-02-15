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

module.exports = {
    createAccountController
}


