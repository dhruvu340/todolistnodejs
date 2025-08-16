const mongoose=require("mongoose");
require("dotenv").config();


module.exports= (function(){
   return function connectDB(){ return mongoose.connect(process.env.MONGO_URL);}
})()