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

async function getUserAccountBalanceByIdController(req,res) {
    const accountId = req.params.accountId;
    const account = await accountModel.findOne({
        _id: accountId,
        userId:req.user._id
    });
    if(!account){
        return res.status(404).json({
            message: "Account not found"
        });
    }
    const balance = await account.getBalance();     
    return res.status(200).json({
        message: "Account Balance retrieved successfully",
        account:account._id,
        balance
    });

}

module.exports = {
    createAccountController,
    getUserAccountsController,
    getUserAccountBalanceByIdController
}


