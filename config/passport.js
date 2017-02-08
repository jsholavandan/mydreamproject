"use strict";
var passport = require("passport");
var mongoose = require("mongoose");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User');
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new LocalStrategy(function (username, password, done) {
    console.log(username);
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Invalid user" });
        }
        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Passwords dont match' });
        }
        return done(null, user);
    });
}));
passport.use(new FacebookStrategy({
    clientID: "314055875662831",
    clientSecret: 'fc93760f47b97fdeb9f34e4db9b60dc7',
    callbackURL: 'http://localhost:3000/api/Facebook/auth/facebook/callback',
    passReqToCallback: true,
    profileFields: ['id', 'name', 'emails', 'gender']
}, function (req, accessToken, refreshToken, profile, done) {
    console.log("pass face");
    User.findOne({ 'facebookId': profile.id }, function (err, user) {
        if (err) {
            done(err);
        }
        console.log("passport user");
        if (user) {
            req.login(user, function (err) {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        }
        else {
            var newUser_1 = new User();
            newUser_1.facebookId = profile.id;
            newUser_1.name = profile.name.givenName;
            newUser_1.email = profile.emails[0].value;
            newUser_1.username = newUser_1.email.split("@")[0];
            newUser_1.gender = profile.gender;
            newUser_1.save().then(function (newdUser) {
                req.login(newUser_1, function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser_1);
                });
            }).catch(function (err) {
                throw err;
            });
        }
    });
}));
