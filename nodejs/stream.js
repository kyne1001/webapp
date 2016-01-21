var fs = require('fs');
var data = "";

var readerStream = fs.createReadStream('tut.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', function(line) {
  data += line;
});

readerStream.on('end', function() {
  console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");