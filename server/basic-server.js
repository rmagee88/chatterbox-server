/* Import node's http module: */
var handler = require('./request-handler');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();

app.options(/messages/, function (req, res) {
  console.log('Options Request')
  handler.createResponse(200, "text/plain", "GET, POST, PUT, DELETE, OPTIONS", req, res);
});

app.get(/classes/, function (req, res) {
  console.log('Get Request Received');
  handler.createResponse(200, "text/json", JSON.stringify(handler.data), req, res);
});

app.post(/classes/, function (req, res) {
  console.log('Post Request Received');
  handler.postHandler(req, res);
});

app.get(/(w+)?/, function (req, res) {
  console.log('Index Request Received');
  urlParts = url.parse(req.url);
  var payloadData;
  if (urlParts.pathname === '/') {
    locationStr = '../client/index.html';
  } else {
    locationStr = '../client/' + urlParts.pathname;
  }
  fs.readFile(locationStr, {encoding: 'utf-8'}, function(err, data){
    if (err) {
      console.log(err);
    }
    payloadData = data;
    handler.createResponse(200, "", payloadData, req, res);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  handler.readData('./log.txt');

  console.log('Example app listening at http://%s:%s', host, port)

});
