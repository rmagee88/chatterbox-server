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

app.get('/', function (req, res) {
  // read in index.html and send it
  console.log('Index Request Received');
  var payloadData;
  fs.readFile('../client/index.html', {encoding: 'utf-8'}, function(err, data){
    if (err) {
      console.log(err);
    }
    payloadData = data;
    handler.createResponse(200, "text/html", payloadData, req, res);
  });
});

app.get(/images/, function (req, res) {
  // read in index.html and send it
  urlParts = url.parse(req.url);
  console.log('CSS Request Received');
  var payloadData;
  fs.readFile('../client/' + urlParts.pathname, {encoding: 'utf-8'}, function(err, data){
    if (err) {
      console.log(err);
    }
    payloadData = data;
    handler.createResponse(200, "image", payloadData, req, res);
  });
});

app.get(/styles/, function (req, res) {
  // read in index.html and send it
  urlParts = url.parse(req.url);
  console.log('CSS Request Received');
  var payloadData;
  fs.readFile('../client/' + urlParts.pathname, {encoding: 'utf-8'}, function(err, data){
    if (err) {
      console.log(err);
    }
    payloadData = data;
    handler.createResponse(200, "text/css", payloadData, req, res);
  });
});

app.get(/scripts/, function (req, res) {
  // read in index.html and send it
  urlParts = url.parse(req.url);
  console.log('Scripts Request Received');
  var payloadData;
  fs.readFile('../client/' + urlParts.pathname, {encoding: 'utf-8'}, function(err, data){
    if (err) {
      console.log(err);
    }
    payloadData = data;
    handler.createResponse(200, "text/javascript", payloadData, req, res);
  });
});

app.get(/bower_components/, function (req, res) {
  // read in index.html and send it
  urlParts = url.parse(req.url);
  console.log('Bower Components Request Received');
  var payloadData;
  fs.readFile('../client/' + urlParts.pathname, {encoding: 'utf-8'}, function(err, data){
    if (err) {
      console.log(err);
    }
    payloadData = data;
    handler.createResponse(200, "text/javascript", payloadData, req, res);
  });
});


app.get(/classes/, function (req, res) {
  console.log('Get Request Received');
  handler.createResponse(200, "text/json", JSON.stringify(handler.data), req, res);
});

app.post(/classes/, function (req, res) {
  console.log('Post Request Received');
  handler.postHandler(req, res);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  handler.readData('./log.txt');

  console.log('Example app listening at http://%s:%s', host, port)

})



