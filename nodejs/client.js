var http = require('http');

var options = {
  host: 'localhost',
  port: '8081',
  path: '/index.html'
};

var cb = function (response) {
  var body = '';
  response.on('data', function(data) {
    body += data;
  });

  response.on('end', function () {
     console.log(body) ;
  });
}

var req = http.request(options, cb);
req.end();