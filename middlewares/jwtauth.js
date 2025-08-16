const jwt=require("jsonwebtoken");

const jwtauthverify= function(req,res,next){
    const authhead=req.headers.authorization;
    if(!authhead||!authhead.startsWith("Bearer ")){return res.status(401).json({message: "No token provided."});}
  const token = authhead.split(' ')[1];
  if(!token){
    return res.status(401).json({message: "No token provided."});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(401).json({message: "error while verifying token" ,error:error.message});
  }
}

module.exports=jwtauthverify;