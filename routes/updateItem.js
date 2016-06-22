var express = require('express');
var fs = require("fs");
var bodyParser = require("body-parser");

var isIdExists = require('./judgeFunction/isIdExists');
var isCorrectDataType = require('./judgeFunction/isCorrectDataType');

var router = express.Router();
router.use(bodyParser.json());

router.put('/:id', function (req, res) {
    var correctDataType = isCorrectDataType(req);

    if (correctDataType === false) {
        res.status(400).end("");
    } else {
        fs.readFile("./items.json", "utf-8", function (err, data) {
            var items = JSON.parse(data);
            var id = parseInt(req.params.id);
            var idExists = isIdExists(items, JSON.parse(id));

            if (idExists === false) {
                res.status(404).end();
            } else {
                var item = {
                    "id": id,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };

                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === id) {
                        items.splice(i, 1);
                    }
                }
                items.push(item);
                fs.writeFile("./items.json", JSON.stringify(items), function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                res.json(item);
            }
        });
    }
});

module.exports = router;
