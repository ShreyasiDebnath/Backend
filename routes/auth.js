const express = require('express')
const server=express()
const { body,  validationResult } = require('express-validator'); // creating a contructor of express-validator
const User=require('../models/User'); //importing user schema
const router = express.Router();
var bcrypt = require('bcryptjs');
const bodyParser=require('body-parser');
server.use(bodyParser.json())
var jwt=require('jsonwebtoken');
const jwt_secret = "shreyasiwebdev"
//strong Data in mongodb using: POST "api/auth/createUser"
router.post('/createUser', [
body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', "Enter a valid Email").isEmail(),
], async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) { //if any of the req is not matching the validation send error
  return res.status(400).json({ errors: errors.array() });
}
let user=await User.findOne({email:req.body.email}) //checking if the email is already used or not
if(user){ //if email is already use donts create new data send error
    return res.status(400).json({error:"Sorry this email is already user by someone"})
}

try {
    //masking the real password for security
    const salt= await bcrypt.genSalt(10);
    const chpass= await bcrypt.hash(req.body.password,salt);
    //creating new data in database
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: chpass,
    date: req.body.date
  });
const data={
    user:{
        id:user.id
    }
}
  const authtoken=jwt.sign(data,jwt_secret);
  res.json(authtoken);
  //res.json(user);
} catch (error) {
  if (error.code === 11000) {
    // Duplicate key error
    return res.status(400).json({ error: 'Email already exists' ,Message:error.message});
  }
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}
})


//finding data from mongodb
        // run()
        // async function run(){
        //     try {
        //         const user=await User.find({name:"shreyasi"})
        //         console.log(user);
                
        //     } catch (error) {
        //         console.log(error.message);
                
        //     }
        // }

// async function run(){
// const user=new User({ name: "shreyasi",
//  email:"email@gmail.com"})
// await user.save()
// console.log(user)
// }

module.exports = router