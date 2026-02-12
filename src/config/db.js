const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}

module.exports = connectToDb;