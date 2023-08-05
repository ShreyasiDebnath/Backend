const express = require('express')
const server=express()
const { body,  validationResult } = require('express-validator');
const bodyParser=require('body-parser');
server.use(bodyParser.json())
const Mynotes= require('../models/Mynotes');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');


//ROUTER 1: Get all the notes using get "/api/notes/getnotes"
router.get('/getnotes',fetchuser,async(req,res)=>{
    try{
    userId=req.user.id
   const notes = await Mynotes.find({ user: req.user.id });;
    res.json(notes)
} catch (error) {
     
    return res.status(400).json({ error:"Internal server error"});
  
  
}
})



//ROUTER 2: put  notes using post "/api/notes/putnotes"
router.post('/putnotes',fetchuser, [
    body('description', 'Enter a valid name').isLength({ min: 5 }),
    body('title', "Enter a valid Email").isLength({ min: 3 }),
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //if any of the req is not matching the validation send error
      return res.status(400).json({ errors: errors.array() });
    }
   
    
    try {
        
      const notes = await Mynotes.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        user:req.user.id
      });
      res.json(notes)
  
    
    } catch (error) {
     
        return res.status(400).json({ error:"Internal server error"});
      
      
    }
    })


//ROUTER 3: update  notes using put "/api/notes/updatenotes/:id"
router.put('/updatenotes/:id',fetchuser, async (req, res) => {
  
    
    
        //create a new note object
        const{title,description}=req.body;
        try{
        const newnotes={};
        if(title){newnotes.title=title};
        if(description){newnotes.description=description};
        //find note and update
      let notes = await Mynotes.findById(req.params.id);
      if(!notes){return res.status(400).send("not found")}
       
      if(notes.user.toString() !== req.user.id){
        return res.status(400).send("not allowed")
      }

      notes=await Mynotes.findByIdAndUpdate(req.params.id,{$set: newnotes},{new:true})
      res.json(notes)
    } catch (error) {
     
        return res.status(400).json({ error:"Internal server error"});
      
      
    }
  
    
   
    })



//ROUTER 4: delete notes using delete "/api/notes/deletenotes/:id"
router.delete('/deletenotes/:id',fetchuser, async (req, res) => {
    try{
  let notes = await Mynotes.findById(req.params.id);
  //The req. params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}.

  if(!notes){return res.status(400).send("not found")}
  
  //The toString() method returns a string as a string. The toString() method does not change the original string. The toString() method can be used to convert a string object into a string.
  if(notes.user.toString() !== req.user.id){
    return res.status(400).send("not allowed")
  }

  notes=await Mynotes.findByIdAndDelete(req.params.id)
  res.json(notes)
} catch (error) {
     
    return res.status(400).json({ error:"Internal server error"});
  
  
}



})
module.exports = router