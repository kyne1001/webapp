var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var db = null;

var app = express();

app.use(bodyParser.json());

// Connect to the db
var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('online-note', server);
db.open(function(err, db) {
  if (!err) {
    console.log('Connected to "online-note" database');
    db.collection('users', function (err, col) {
      col.findOne(function (err, item) {
        console.log(item);
      });
    });
  } else {
    console.dir(err);
    process.exit(1);
  }
});
// db.users.insert({
// username: 'quanlieu',
// password: '132456',
// realname: 'Lieu Chi Quan',
// gender: true,
// yob: 1988
// })

// Router
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
