const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


const Userschema=new mongoose.Schema({
    username:{type:String,required:true},
   email:{type:String,required:true,unique:true},
    password:{type:String,required:true,select:false},
    
},{timestamps:true});


Userschema.pre('save',async function (next){
    const user=this;
    if(!user.isModified('password')){return next();}
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(user.password,salt);
        user.password=hashedPassword;
        next();
        
    } catch (error) {
       next(error);
        
    }
})

Userschema.methods.comparepass=async function (password) {
    return await bcrypt.compare(password,this.password);
}


const User= mongoose.model("User",Userschema);

module.exports=User;
