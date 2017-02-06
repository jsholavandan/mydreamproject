"use strict";
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();
router.get('/Interpret', function (req, res) {
    var symbol = req.query.symbol;
    var url = "http://cafeausoul.com/dreams/dreamdictionary/" + symbol;
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var label = void 0, description = void 0;
            var labelTxt = $('.dictionary_results').children('h4').text();
            var desc = $('.dictionary_results_content').children('p').text();
            console.log(labelTxt + "  " + desc);
            if (labelTxt !== "" && desc !== "") {
                var json = {
                    label: labelTxt,
                    content: desc
                };
                res.json(json);
            }
            else {
                console.log("sorry");
                res.status(404).json({ message: "Sorry, no results found." });
            }
        }
        else {
            console.log(error);
            res.status(500);
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
