const mongoose = require("mongoose");

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

module.exports = mongoose.model("Account", accountSchema);