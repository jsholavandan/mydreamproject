import * as express from 'express';
import passport = require('passport');
import jwt = require('jsonwebtoken');


let Users = require('../models/user');
let router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect:'/Login',
  }),
  function(req, res){
    console.log("facebook");
    if(req.isAuthenticated()){
      let token = {
        token: req.user.generateJWT()
      }
      res.redirect('/Token/' + token.token);
    }else{
      res.status(500).json({message:'Sorry. You are not authenticated.'});
    }

  });

export default router;
