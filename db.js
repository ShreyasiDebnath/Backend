const  mongoose = require("mongoose");
const mongoURI="mongodb://127.0.0.1:27017/inotebook"
var db = mongoose.connection; 

db.on('error', function(err){
    console.log('No connection found', err);

});
const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    console.log("connected to mongo");
}
module.exports = connectToMongo;
