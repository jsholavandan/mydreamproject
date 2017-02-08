"use strict";
var express = require("express");
var passport = require("passport");
var Users = require('../models/user');
var router = express.Router();
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/Login',
}), function (req, res) {
    console.log("facebook");
    if (req.isAuthenticated()) {
        var token = {
            token: req.user.generateJWT()
        };
        res.redirect('/Token/' + token.token);
    }
    else {
        res.status(500).json({ message: 'Sorry. You are not authenticated.' });
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
