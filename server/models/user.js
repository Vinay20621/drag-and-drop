const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    googleId: String, 
    firstName: String,
    lastName: String,
    email: String,
    password: String, 
  });
const User = mongoose.model('User', userSchema);

module.exports = User;