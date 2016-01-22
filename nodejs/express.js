'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', function (req, res) {
  console.log('Get a get request for the home page');
  if (req.cookies) {
    console.log(req.cookies);
  }
  res.send('Hello get');
});

app.get('/user', function (req, res) {
  var user = {
    firstName: req.query['first-name'], // req.query.name only works when no dash
    lastName: req.query['last-name']
  }
  console.log(JSON.stringify(user));
  res.send(user);
});

app.post('/', function (req, res) {
  console.log('Get a post request for the home page');
  res.send('Hello post');
});

app.post('/user', urlencodedParser, function (req, res) {
  var user = {
    firstName: req.body['first-name'], // req.body.name only works when no dash
    lastName: req.body['last-name']
  }
  console.log(JSON.stringify(user));
  res.send(user);
});

app.delete('/', function (req, res) {
  console.log('Get a delete request for the home page');
  res.send('Hello delete');
});

app.delete('/user', function (req, res) {
  console.log('Get a delete request for user page');
  res.send('Hello delete user');
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port)
});
