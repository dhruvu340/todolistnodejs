const express= require("express");
const app=express();
const connectDB=require("./connection");
const todorouter=require("./routes/todo")
const authrouter=require("./routes/user")


connectDB().then(()=>{
    console.log("conneted to db");
    
});

app.use(express.json());




app.use("/api/todo",todorouter);

app.use("/api/user",authrouter);

app.listen(3000,()=>{
    console.log("server listening on port 3000");
    
})
