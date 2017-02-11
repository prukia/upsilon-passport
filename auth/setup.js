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
passport.deserializeUser(function(id, done){
  console.log('Deserializing User');
  User.findById(id, function(err, user){
    if (err) {
      console.log('Error deserializing User', err);
      return done(err);
    }

    done(null, user);
  })
});

//call back we are providing to passport. passport passes the params
function findAndComparePassword(username, password, done) {
  console.log("Finding and comparing passwords");
  User.findAndComparePassword(username, password).then(function(result){
    console.log('result', result);
    if (result.match) {
      done(null, result.user);
    } else {
      done(null, false);
    }
  }).catch(function(err){
    done(err);
  });
}
