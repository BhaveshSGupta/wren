var mysql = require('mysql');
var url = require('url');
var util = require('util');
var twitter = require('twitter');
var moment = require('moment-timezone');
var api = require('../api.config');

// Define CORS headers
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds
  "Content-Type": "application/json"
};

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'little_bird',
  database : 'little_bird'
});

// Connect to Twitter API
var twit = new twitter({
  consumer_key: api.twitter.key,
  consumer_secret: api.twitter.secret,
  access_token_key: api.twitter.access_token,
  access_token_secret: api.twitter.access_token_secret
});

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
          twit.search('bitcoin OR #bitcoin', function(data) {
            for(var i = 0; i < data.statuses.length; i++) {
              var user = data.statuses[i].user.screen_name;
              var text = data.statuses[i].text;
              // convert timezone to San Francisco time
              var timestamp = moment(data.statuses[i].created_at).tz("America/Los_Angeles").format('YYYY-MM-DD HH:MM:SS');
              connection.query("INSERT INTO Tweets (username, text, timestamp) VALUES (?, ?, ?)", 
                [user, text, timestamp], 
                function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                  }
                // connection.end();
              });
            }
            // get hashtag here
            // need to convert timestamp to the proper timezone
            
            
          });
          
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
