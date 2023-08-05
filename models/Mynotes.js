const  mongoose = require("mongoose");
const { Schema } = mongoose;

// creating schema
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const notesSchema =  new Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {type: String,required:true}, // String is shorthand for {type: String}
    description: String,
    date: { type: Date, default: Date.now },
    
  });

    // To use our schema definition, we need to convert our Schema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
    
module.exports = mongoose.model('Mynotes', notesSchema);