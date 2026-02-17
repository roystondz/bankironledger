const mongoose = require("mongoose");

const tokenBlackList = new mongoose.Schema({
    token: {
        type: String,
        required: [true,"Token is required"],
        unique: [true,"Token is already blacklisted"]
    },
},{
    timestamps: true
})

tokenBlackList.index({createdAt: 1},
    {expireAfterSeconds: 60*60*24*3}//3 days
)

const TokenBlackList = mongoose.model("TokenBlackList", tokenBlackList);

module.exports = TokenBlackList;