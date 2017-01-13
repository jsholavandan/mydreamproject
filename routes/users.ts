import * as express from 'express';
import passport = require('passport');
import jwt = require('jsonwebtoken');

let User = require('../models/user');
let router = express.Router();


router.post('/Register', (req, res, next) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err, user){
    if(err){
      return next(err);
    }
    res.json({message: "Registration complete. Please login."})
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
  });
});



export default router;
