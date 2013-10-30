var url = require('url');
var util = require('util');


// Define CORS headers
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds
  "Content-Type": "application/json"
};

exports.sendResponse = sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(obj));
};

var collectData = function(request, callback){
  var data = "";
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

  switch(req.method) {
    case 'GET':
      switch(pathName) {
        case '/':
          res.writeHead(200, headers);
          res.end("GET method received");
          break;
        case '/seed-tweets':
          res.writeHead(200, headers);
          res.end("time to seed some tweets!");
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
