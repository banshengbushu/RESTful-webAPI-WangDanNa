var express = require('express');
var router = express.Router();
var fs = require("fs");

var isIdExists = require('./judgeFunction/isIdExists');

router.get('/:id', function (req, res) {
    var id = parseInt(req.params.id);

    fs.readFile("./items.json", 'utf8', function (err, data) {
        var items = JSON.parse(data);
        var idExists = isIdExists(items, id);

        if (err) {
            console.log(err);
        } else if (idExists === false) {
            res.status(404).end("");
        } else {
            res.json(idExists);
        }
    });
});

module.exports = router;