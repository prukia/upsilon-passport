const mongoose = require('mongoose');
var bcrypt = require ('bcrypt');
var SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
// ensure that each time a user is saved we has the password first
//should be able to use this on any app
userSchema.pre('save', function (done){
  var user = this;


  if (user.isModified('password')){
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if (err){
        console.log('Error hashing password', err);
         done(err);
      }else {
        user.password = hash;
        done();
      }
    });
  }else{
    done();
  }
});
userSchema.methods.comparePassword = function (password, done){
  var user = this;
//params 1. clear text password 2. hashed password
  bcrypt.compare(password, user.password, function (err, match){
    if(err){
      console.log('Error comparing password', err);
      done(err);
    }else{
      done(null, match);
    }
  })
}



const User = mongoose.model('User', userSchema);

module.exports = User;

// inside header
// content:type application/json
// inside body
// {
//   "username": "test",
//   "password": "1234"
// }
