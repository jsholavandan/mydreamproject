import passport = require('passport');
import mongoose = require('mongoose');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let User:any = mongoose.model('User');


passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

passport.use(new LocalStrategy(function(username, password, done){
  console.log(username);
  User.findOne({username:username}, function(err, user){
    if(err){
      return done(err);
    }

    if(!user){
      return done(null, false, {message: "Invalid user"});
    }
    if(!user.validatePassword(password)){
      return done(null, false, {message: 'Passwords dont match'});
    }

    return done(null, user);
  });
}));

passport.use(new FacebookStrategy({
  clientID:"314055875662831",
  clientSecret:'fc93760f47b97fdeb9f34e4db9b60dc7',
  callbackURL:'http://localhost:3000/api/Facebook/auth/facebook/callback',
  passReqToCallback: true,
  profileFields:['id','name','emails','gender']
},function(req, accessToken, refreshToken, profile, done){
  console.log("pass face");
  User.findOne({'facebookId': profile.id}, function(err, user){
    if(err){
      done(err);
    }
    console.log("passport user");
    if(user){
      req.login(user,function(err){
          if(err){
              return done(err);
          }
          return done(null, user);
      });
    }else{
      let newUser =  new User();
      newUser.facebookId = profile.id;
      newUser.name = profile.name.givenName;
      newUser.email = profile.emails[0].value;
      newUser.username = newUser.email;
      newUser.gender = profile.gender;
      newUser.save().then((newdUser) => {
        req.login(newUser,function(err){
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
      }).catch((err) =>{
        throw err;
      });
    }
  });
}

))
