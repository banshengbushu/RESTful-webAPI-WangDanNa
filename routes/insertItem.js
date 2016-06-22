var express = require('express');
var fs = require("fs");
var bodyParser = require("body-parser");

var isCorrectDataType = require('./judgeFunction/isCorrectDataType');

var router = express.Router();
router.use(bodyParser.json());

router.post('/', function (req, res) {
    console.log(parseFloat(req.body.price));
    if (isCorrectDataType(req) === false) {
        res.status(400).end("");
    } else {
        fs.readFile("./items.json", "utf-8", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var items = JSON.parse(data);
                var item = {
                    "id": id++,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };

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
