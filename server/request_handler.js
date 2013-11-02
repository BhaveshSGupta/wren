var url = require('url');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

// Define CORS headers
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds
  "Content-Type": "application/json"
};

// establish database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'little_bird',
  database : 'little_bird',
  charset  : 'utf-8',
  multipleStatements: true
});

exports.sendResponse = sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(obj));
};

var collectData = function(request, callback){
  var data = "";
  request.on('error', function(err){
    console.log("ERROR: " + err.message);
  });
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

exports.eventHandler = function(req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);
  var pathName = url.parse(req.url).pathname;
  var lookup = '../client/index.html';

  // specify contentType based on file extension
  var extname = path.extname(lookup);
  var contentType;
  switch(extname){
    case '.js':
      contentType = "text/javascript";
      break;
    case '.css':
      contentType = "text/css";
      break;
    default:
      contentType = "text/html";
      break;
  }

  switch(req.method) {
    case 'GET':
      switch(pathName) {
        case '/':
          // send stat data to client
          res.writeHead(200, headers);
          res.end("GET method received");
          break;
        case '/data':
          // get Tweet data
          var timestamp = decodeURIComponent(url.parse(req.url).query, true);
          console.log(timestamp);
          // connection.query("SELECT * FROM tweets WHERE timestamp >= TO_TIMESTAMP(")
          // res.writeHead(200, headers);
          // res.end("GET method received at /data");
          break;
        default:
          res.writeHead(404, headers);
          res.end("File not found.");
          break;  
      }
      break;

    case 'POST':
      res.writeHead(200, headers);
      res.end("POST method received");
      break;
    case 'OPTIONS':
      res.writeHead(200, headers);
      res.end("OPTIONS method received");
      break;
    default:
      res.writeHead(501, headers);
      res.end('unrecognized request method');
      break;
  }
};
