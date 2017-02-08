// all of passport related stuff

var passport = require ('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');



passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, findAndComparePassword));
//user to userId
passport.serializeUser(function(user, done){
  console.log('Serializing User');
  done(null, user.id);

});
// userID to user
passport.deserializeUser(function (id, done){
  User.findById(id, function(err,user){
    console.log('Deserializing user');
    if (err){
      console.log('Error deserializing User', err);
      return done(err);
    }

    done(null, user);
  })

});

//call back we are providing to passport. passport passes the params
function findAndComparePassword (username, password, done){
  console.log('Finding and comparing passwords');
  User.findOne({username: username}, function (err,user){
    if(err){
      console.log('Error finding user by username', err);
      return done(err);
    }

    if(user){
      console.log('found a user with username', username);
      user.comparePassword(password, function(err, match){
        if(err){
          done(err);
          console.log('Error comparing passwords');
        }else{
          if(match){
            done(null, user);
            console.log('passwords matched');
          }else{
            done(null, false);
            console.log('passwords did not match');
          }
        }
      });

      // if (user.password === password) {
      //   console.log('Passwords matched');
      //
      //   //passing the user object here indicates to passport
      //   //that the user passed our validation and should be logged in
      //   return done(null, user);
      // }
    }else{
      console.log('User was not found');
        done(null, false);
    }
    //we found corrsponding user but their passwords do not matched
    //false means the user did not pass validation and shoulf not be logged in

  });

}
