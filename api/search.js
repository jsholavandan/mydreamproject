"use strict";
var express = require("express");
var dream_1 = require("../models/dream");
var router = express.Router();
router.get('/searchPublic', function (req, res) {
    var searchTxt = req.query.searchTxt;
    dream_1.default.find({ "$text": { "$search": searchTxt }, pvt: false }).then(function (dreams) {
        res.json(dreams);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.get('/', function (req, res) {
    var searchTxt = req.query.searchTxt;
    var username = req.query.username;
    dream_1.default.find({ username: username, "$text": { "$search": searchTxt } }).then(function (dreams) {
        res.json(dreams);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.get('/userDreams', function (req, res) {
    var username = req.query.username;
    dream_1.default.find({ username: username }).then(function (dreams) {
        res.json(dreams);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
