/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require("fs");

exports.defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.data = {results: []};

exports.writeData = function(filename){
  fs.writeFile(filename, JSON.stringify(exports.data));
};

exports.readData = function(filename){
  fs.readFile(filename, function(err, data){
    exports.data = JSON.parse(data);
  });
};

exports.createResponse = function(status, type, payload, req, res){
  var headers = exports.defaultCorsHeaders;
  headers['Content-Type'] = type;
  res.writeHead(status, headers);
  res.end(payload);
};

exports.postHandler = function(req, res){
  console.log('Post Request Received');
  var body = "";
  req.on('data', function (chunk) {
      console.log('got %d bytes of data :', chunk.length);
      body += chunk;
  });

  req.on('end', function () {
    debugger;
    exports.data.results.push(JSON.parse(body));
    exports.createResponse(201, "text/json", JSON.stringify(exports.data), req, res);
    exports.writeData('./log.txt');
  });
};

