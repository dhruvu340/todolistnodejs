const User=require("../models/user");
const jwt=require("jsonwebtoken");

const handlesignup=async (req,res)=>{
 const {username,email,password}=req.body;
 try {
    const exist=await User.findOne({email});
    if(exist){
        return res.status(400).json({message:"Email already exist"});
    }
    const user=new User({username,email,password});
    await user.save();
    const payload = { id: user._id, email: user.email };

    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"});
    return res.status(201).json({msg:"user created",token:token})

    
 } catch (error) {
    res.status(500).json({msg:"error while signup",error:error.message})
 }
}

const handlelogin=async(req,res)=>{
const {email,password}=req.body;
try{
    const user=await User.findOne({email:email}).select("+password");
    if(!user){
        return res.status(400).json({message:"Email not found"});
    }

    const ismatch=await user.comparepass(password);
    if(!ismatch){return res.status(400).json({message:"password is not correct"});}
const payload = { id: user._id, email: user.email };

    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"})
    return res.status(200).json({msg:"login success",token:token})

}catch(error){
 res.status(500).json({msg:"error while login",error:error.message})
}
}

module.exports={handlelogin,handlesignup};