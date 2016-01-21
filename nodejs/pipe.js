var fs = require("fs");
var zlib = require('zlib');

fs.createReadStream('tut.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('tut.txt.gz'));