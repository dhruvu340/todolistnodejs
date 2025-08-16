const mongoose=require("mongoose");
require("dotenv").config();


module.exports= connectDB=()=>{
    return mongoose.connect(process.env.MONGO_URL);
}