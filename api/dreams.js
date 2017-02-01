"use strict";
var express = require("express");
var dream_1 = require("../models/dream");
var router = express.Router();
router.get('/publicDreams', function (req, res) {
    console.log("hello");
    dream_1.default.find({ pvt: false }).then(function (dreams) {
        console.log(dreams);
        res.json(dreams);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.get('/', function (req, res) {
    var username = req.query.username;
    dream_1.default.find({ username: username }).then(function (dreams) {
        res.json(dreams);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.get('/:id', function (req, res) {
    var id = req.params.id;
    dream_1.default.findById(id).then(function (dream) {
        res.json(dream);
    }).catch(function (err) {
        res.status(400);
    });
});
router.post('/', function (req, res) {
    var obj = req.body;
    dream_1.default.create(obj).then(function (newDream) {
        res.json({ message: 'Photo saved.' });
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
router.post('/:id', function (req, res) {
    var id = req.params.id;
    dream_1.default.findById(id).then(function (dream) {
        dream.dreamDate = req.body.dreamDate;
        dream.content = req.body.content;
        dream.title = req.body.title;
        dream.nightmare = req.body.nightmare;
        dream.lucid = req.body.lucid;
        dream.recurring = req.body.recurring;
        dream.emotions = req.body.emotions;
        dream.pvt = req.body.pvt;
        dream.role = req.body.role;
        dream.comments = req.body.comments;
        dream.save().then(function (updatedDream) {
            res.json(updatedDream);
        }).catch(function (err) {
            res.status(500);
            console.log(err);
        });
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
