var express = require('express');
var router = express.Router();
var fs = require("fs");

var isIdExists = require('./judgeFunction/isIdExists');

router.delete('/:id', function (req, res) {
    fs.readFile("./items.json", "utf-8", function (err, data) {
        var items = JSON.parse(data);
        var id = parseInt(req.params.id);
        var idExists = isIdExists(items, id);

        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i <= items.length; i++) {
                if (idExists === items[i]) {
                    items.splice(i, 1);
                }
            }
        }

        fs.writeFile("./items.json", JSON.stringify(items), function (err) {
            if (err) {
                console.log(err);
            } else if (idExists === false) {
                res.status(404).end("");
            } else {
                res.status(204).send("");
            }
        });
    });
});

module.exports = router;