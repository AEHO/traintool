'use strict';
/**
 * Serves stuff!
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.compress());
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(app.router);
app.get('*', function (req, res) {
    res.send('404 error', 404);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server running on " + app.get('port'));
});
