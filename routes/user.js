const express=require("express");
const {handlelogin,handlesignup}=require("../controllers/user");
const router=express.Router();

router.post("/signup",handlesignup);
router.post("/login",handlelogin);


module.exports=router;