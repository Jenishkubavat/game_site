var mongoose = require('mongoose');

// Mongoose shema

 const playerschema = new mongoose.Schema({
   email: {
     type: String,
     required: true
   },
   name: {
     type: String,
     required: true
   },
   password: {
      type: String,
      required: true
  }

 });
 module.exports= mongoose.model('Player',playerschema);