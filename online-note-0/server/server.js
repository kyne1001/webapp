var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var constants = require("./app/constants");
var db = null;

var app = express();

// Connect to the db
var MongoClient = mongo.MongoClient;

var promise = MongoClient.connect('mongodb://localhost:27017/online-note');

promise.then(function (db) {
  // Router
  app.all('/api/v1/*', [require('./app/middlewares/validate-request')]);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(function(req, res, next){
    req.db = db;
    next();
  });

  app.use('/', require('./app/routes'));

  // Start server
  app.set('port', process.env.PORT || 3000);

  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });

  module.exports = app;

});
