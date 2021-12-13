const mongoose = require('mongoose');
require('dotenv').config();

//const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/delivery-app";
const connectionString = process.env.MONGO_URI;
const configOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}

mongoose.connect(connectionString, configOptions)
.then(
    ()=>console.log("MongoDB successfully connected...")
)
.catch(
    ()=>{
        (err)=> console.log(`MongoDB Connection Error: ${err}`)
    }
)

module.exports={
    User:require('./User'),
}

