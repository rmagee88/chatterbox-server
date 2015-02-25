/* Import node's http module: */
var handler = require('./request-handler');
var express = require('express');
var app = express();

app.options(/messages/, function (req, res) {
  console.log('Options Request')
  handler.createResponse(200, "plain", "GET, POST, PUT, DELETE, OPTIONS", req, res);
});

app.get(/messages/, function (req, res) {
  console.log('Get Request Received');
  handler.createResponse(200, "json", JSON.stringify(handler.data), req, res);
});

app.post(/messages/, function (req, res) {
  console.log('Post Request Received');
  handler.postHandler(req, res);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  handler.readData('./log.txt');

  console.log('Example app listening at http://%s:%s', host, port)

})



