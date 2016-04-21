var express = require('express');
var router = express.Router();
var pg = require('pg');

// Set up an express server
var app = express();

app.all('/*', function (req, res, next) {
  // PG client setting
  var client = new pg.Client({
    user: 'postgres',
    password: '123456',
    database: 'ngaytho',
    host: 'localhost',
    port: 5432
  });
  var selectString = 'SELECT * FROM votoi.danhsach';

  // Connect to database
  client.connect();

  //query is executed once connection is established and PostgreSQL server is ready for a query
  var query = client.query(selectString);
  var jSON = [];
  query.on('row', function(row) {
    jSON.push(row)
  });
  query.on('error', function(err) {
    console.log(err);
    res.write('Ops, something went wrong');
  });
  query.on('end', function(row) {
    res.send(jSON);
    client.end.bind(client) //disconnect client manually
  });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
