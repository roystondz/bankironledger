const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Account is required"],
        immutable:true,
        index:true
    },
    amount:{
        type:Number,
        required:[true, "Amount is required"],
        min:[0.01, "Amount must be greater than 0"],
        immutable:true,
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Transaction is required"],
        immutable:true,
        index:true
    },
    type:{
        type:String,
        enum:{
            values:["DEBIT","CREDIT"],
            message:"Type must be either DEBIT or CREDIT"
        },
        required:[true, "Type is required"],
        immutable:true,
    },
}); 

function preventLedgerModification()
{
    throw new Error("Ledger records cannot be modified");
}

ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("bulkWrite", preventLedgerModification);
ledgerSchema.pre("replaceOne", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("update", preventLedgerModification);
ledgerSchema.pre("delete", preventLedgerModification);

module.exports = mongoose.model("ledger", ledgerSchema);
