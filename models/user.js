const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// inside header
// content:type application/json
// inside body
// {
//   "username": "test",
//   "password": "1234"
// }
