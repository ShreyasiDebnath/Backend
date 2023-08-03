const  mongoose = require("mongoose");

// creating schema
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const notesSchema = new Schema({
    title: {type: String,required:true,unique:true}, // String is shorthand for {type: String}
    description: string,
    date: { type: Date, default: Date.now },
    
  });

  //   To use our schema definition, we need to convert our Schema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
mongoose.exports = mongoose.model('note', notesSchema);