const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required for account creation"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:['ACTIVE','FROZEN','CLOSED'],
            message: 'Status must be either ACTIVE, FROZEN or CLOSED',
        },
        default:'ACTIVE'
    },
    currency:{
        type:String,
        required:[true, "Currency is required"],
        default:'INR'
    },

},{
    timestamps:true
});

accountSchema.index({userId:1,status:1});

accountSchema.methods.getBalance = async function(){
    const balanceData = await  ledgerModel.aggregate([
        {
            $match: {
                account: this._id
            }
        },{
            $group: {
                _id: null,
                totalDebits: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "DEBIT"] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredits: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "CREDIT"] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },{
            $project: {
                _id: 0,
                balance: {
                    $subtract: ["$totalDebits", "$totalCredits"]
                }
            }
        }
    ])
    
    
   if (balanceData.length === 0) {
    return 0;
   }
   return balanceData[0].balance;
}

module.exports = mongoose.model("Account", accountSchema);