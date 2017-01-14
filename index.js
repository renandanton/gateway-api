var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var adapter = require('./config/adapters/mysql');
var connection  = require('express-myconnection');

var app = express();
var server = http.createServer(app);

app.use(connection(mysql, adapter));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./config/cors'));

require('./routes')(app);

server.listen(3000, function () {
  console.log('cgs-gateway has been started');
});
