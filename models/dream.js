"use strict";
var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    commentTitle: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});
var DreamSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dreamDate: {
        type: Date,
        required: true
    },
    recurring: {
        type: Boolean,
        required: true
    },
    nightmare: {
        type: Boolean,
        required: true
    },
    lucid: {
        type: Boolean,
        required: true
    },
    role: {
        type: Boolean,
        required: true
    },
    pvt: {
        type: Boolean,
        required: true
    },
    emotions: [String],
    comments: [CommentSchema]
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Dream', DreamSchema);
