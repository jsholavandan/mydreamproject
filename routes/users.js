"use strict";
var express = require("express");
var passport = require("passport");
var user_1 = require("../models/user");
var router = express.Router();
router.post('/Register', function (req, res, next) {
    var user = new user_1.default();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err, newUser) {
        if (err) {
            return next(err);
        }
        res.json({ message: "Registration complete. Please login." });
    }).catch(function (err) {
        res.status(500);
    });
});
router.post('/Login/Local', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Please fill in all fields." });
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json({ token: user.generateJWT() });
        }
        return res.status(400).send(info);
    })(req, res, next);
});
router.get('/', function (req, res) {
    var username = req.query.username;
    console.log("username " + username);
    user_1.default.find({ username: username }).then(function (users) {
        console.log(users);
        res.json(users);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.post('/:id', function (req, res) {
    var id = req.params.id;
    user_1.default.findById(id).then(function (user) {
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.age = req.body.age;
        user.email = req.body.email;
        console.log(req.body.password);
        if (req.body.password !== undefined && req.body.password !== "") {
            console.log("i am here");
            user.setPassword(req.body.password);
        }
        user.save().then(function (savedUser) {
            res.json({ message: "Changes saved successfully." });
        }).catch(function (err) {
            console.log(err);
            res.status(500);
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
