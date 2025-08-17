const express=require("express");
const {handlelogin,handlesignup}=require("../controllers/user");
const { signupValidation, loginValidation }=require("../middlewares/authvalidation");
const router=express.Router();

router.post("/signup",signupValidation,handlesignup);
router.post("/login",loginValidation,handlelogin);


module.exports=router;