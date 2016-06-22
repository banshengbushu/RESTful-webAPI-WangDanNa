var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function (req, res) {
    fs.readFile("./items.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

module.exports = router;