const express= require("express");
const app=express();
const connectDB=require("./connection");

connectDB().then(()=>{
    console.log("conneted to db");
    
});

app.use(express.json());

app.listen(3000,()=>{
    console.log("server listening on port 3000");
    
})
