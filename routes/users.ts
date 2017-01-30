import * as express from 'express';
import passport = require('passport');
import jwt = require('jsonwebtoken');

import User from '../models/user';
let router = express.Router();


router.post('/Register', (req, res, next) => {

  let user:any = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err, newUser){
    if(err){
      return next(err);
    }
    res.json({message: "Registration complete. Please login."})
  }).catch((err) => {
    res.status(500);
  });
});


router.post('/Login/Local',(req, res, next) => {

  if(!req.body.username || !req.body.password){
    res.status(400).json({message:"Please fill in all fields."});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    }
    if(user){
      return res.json({token: user.generateJWT()});
    }
    return res.status(400).send(info);
  })(req, res, next);
});

router.get('/', (req, res) => {
  let username = req.query.username;
  console.log("username " + username);
  User.find({username:username}).then((users) => {
    console.log(users);
    res.json(users);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id).then((user:any) => {
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.age = req.body.age;
    user.email = req.body.email;
    console.log(req.body.password);
    if(req.body.password !== undefined && req.body.password !== ""){
      console.log("i am here");
      user.setPassword(req.body.password);
    }
    user.save().then((savedUser) => {
      res.json({message:"Changes saved successfully."});
    }).catch((err) => {
      console.log(err);
      res.status(500);
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
})

export default router;
