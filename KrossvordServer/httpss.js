

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('ssh/key.pem', 'utf8');
var certificate = fs.readFileSync('ssh/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


app.get('/', function(req,res) {
    res.send('hello');
});


httpServer.listen(8080);
httpsServer.listen(8443);