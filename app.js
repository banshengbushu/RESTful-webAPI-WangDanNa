var express = require('express');
var app = express();
var fs = require("fs");

global.id = 1;

app.use('/items', require('./routes/insertItem'));
app.use('/items', require('./routes/deleteItem'));
app.use('/items', require('./routes/getItem'));
app.use('/items', require('./routes/getItems'));
app.use('/items', require('./routes/updateItem'));

fs.exists('./items.json', function (exists) {
    if (!exists) {
        if (!fs.createWriteStream('items.json', {encoding: "utf8"})) {
            console.log('error error');
        }
        fs.writeFile('./items.json', JSON.stringify([]));
    }
});

app.listen(8080);

module.exports = app;