var jwt=require('jsonwebtoken');
const jwt_secret = "shreyasiwebdev"

const fetchuser = (req,res,next)=>{
    //Get the user from the jwt token add id to req objet
    const token=  req.header('auth-token');
    if(!token){
        res.status(401).send({erroe:"please authenticate using a valid token"})
    }
    try{
    const data= jwt.verify(token,jwt_secret);
    req.user = data.user;
    next();
    }catch(error){
        res.status(401).send({error:"please authenticate using a valid token"})

    }
}




module.exports = fetchuser;