var fs = require("fs");

var readFileAsync = function () {
  fs.readFile('tut.txt', function (err, data) {
     if (err) {
       return console.log(error);
     }
     console.log('Async read: ', data.toString());
  });
}

var readFileSync = function () {
  var data = fs.readFileSync('tut.txt');
  console.log('Sys read: ', data.toString());

  console.log('End');
}

var open = function (argument) {
  console.log("Going to open file!");
  fs.open('tut.txt', 'r+', function(err, fd) {
    if (err) {
      return console.error(err);
    } else {
      console.log("File opened successfully!"); 
    }
  })
}

var stats = function () {
  console.log('Going to fet file info');
  fs.stat('tut.txt', function (err, stats) {
    if (err) {
      return console.log(err);
    } else {
      console.log('Got file info successfully');
      console.log(stats);
      console.log(stats.isFile());
      console.log(stats.isDirectory());
    }
  });
  console.log('End call, info come later');
}

var write = function () {
  console.log('Going to write to file');
  fs.writeFile('out.txt', 'This is just a text line', function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log('Data written successfully. let\' read it back');
      fs.readFile('out.txt', function (err, data) {
        if (err) {
          return console.log(err);
        } else {
          console.log('Async read: ', data.toString());
        }
      });
    }
  });
}
