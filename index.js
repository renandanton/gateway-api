var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

// Replace this lines for change adapter
var mysql = require('mysql');
var adapter = require('./config/adapters/mysql');
var connection  = require('express-myconnection');
app.use(connection(mysql, adapter));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If you need specific cors change the config cors 
app.use(require('./config/cors'));

require('./routes')(app);

server.listen(3000, function () {
  console.log('gateway has been started');
});
