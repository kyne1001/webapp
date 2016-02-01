var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var app = express();

app.use(bodyParser.json());

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
