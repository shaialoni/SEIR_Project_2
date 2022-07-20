//require dotenv package so we can get things out of our .env file
require('dotenv').config()
// getting mongoose to use
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
  });
  
  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB!", err);
  });



// const DATABASE_URI = process.env.DATABASE_URI
// const config = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

// // connecting our mongoDB to mongoose
// mongoose.connect(DATABASE_URI, config)

// mongoose.connection
// // handle the opening of the connection
// // running code block on open
// // console.logging a string    
//     .on('open', () => console.log('Connected to Mongoose'))
//     //since we have opened a connection we have to close it
//     // running a code block on close
//     .on('close', () => console.log('Disconnected from Mongoose'))
//     // handle any errors that might happen
//     // running a code block on error using console.error
//     .on('error', err => console.error(err))



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


module.exports = mongoose

