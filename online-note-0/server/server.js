var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var db = null;

var app = express();

// Connect to the db
var MongoClient = mongo.MongoClient;

var x = MongoClient.connect('mongodb://localhost:27017/online-note');

x.then(function (db) {
    // Router
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(function(req, res, next){
    req.db = db;
    next();
  });

  app.use('/', require('./app/routes'));

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Start server
  app.set('port', process.env.PORT || 3000);

  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });

  module.exports = app;

});