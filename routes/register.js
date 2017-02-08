var router = require('express').Router();
var User = require('../models/user');

router.post('/', function (req, res){
  User.findOne({username: req.body.username }, function (err, users){
    if(err){
      console.log("Error checking for existing user", err);
      return res.sendStatus(500);
    }

    if(user) {
      return res.status(400).send('Username already taken');
    }

    var user = new User ({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function (err){
      if(err){
        console.log('Error saving new user');
        res.sendStatus(500);
      } else {
        console.log('Created new user');
        res.sendStatus(201);

  //@TODO create a login session for the user
  
  req.login(user, function (err){
    if(err){
      console.log('Error logging in newly registered user', err);
      return res.sendStatus(500);
    }
  });
      res.sendStatus(201);
      }
    });

  });
});



module.exports = router;
