// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/mydb', function(err, db) {
  if (err) { return console.dir(err); }

  var collection = db.collection('test');
  var doc1 = {hello: 'doc1'};
  var doc2 = {hello: 'doc2'};
  var manyDocs = [
  	{hello: 'doc3'},
  	{hello: 'doc4'}
  ]

  collection.insert(doc1);
  collection.insert(doc2, {w:1}, function(err, result) {});
  collection.insert(manyDocs, {w:1}, function(err, result) {});
});