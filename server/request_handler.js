var url = require('url');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var moment = require('moment');


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
  host     : 'littlebird.c0eactkzzr6c.us-west-2.rds.amazonaws.com',
  port     : '3306',
  user     : process.env.AMAZON_RDS_USER,
  password : process.env.AMAZON_RDS_PWD,
  database : 'wren',
  // host     : 'localhost',
  // user       : 'root',
  // database   : 'little_bird',
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

  if (pathName === "/") {
    lookup = '../client/index.html';
  } else if (pathName.slice(0,6) === '/bower'){
    lookup = '../' + pathName;
  } else {
    lookup = '../client/' + pathName;
  }

  // Specify contentType based on file extension
  var extname = path.extname(lookup);
  var contentType;

  switch(extname){
    case '.js':
      contentType = "text/javascript";
      break;
    case '.css':
      contentType = "text/css";
      break;
    case '.ttf':
      contentType = "font/ttf";
    default:
      contentType = "text/html";
      break;
  }

  switch(req.method) {
    case 'GET':
      switch(pathName) {
        case '/':
          // serve up index file
          fs.exists(path.resolve(__dirname, lookup), function(exists) {
            if(exists) {
              fs.readFile(path.resolve(__dirname, lookup), function(err, data) {
                if (err) {
                  res.writeHead(500);
                  res.end();
                } else {
                  res.writeHead(200, {"Content-Type": contentType });
                  res.end(data);
                }
              });
            } else {
              res.writeHead(404, headers);
              res.end();
            }
          });
          break;
        case '/data':
          var params = JSON.parse(decodeURIComponent(url.parse(req.url).query, true));
          var now = Math.floor(new Date() / 1000);
          var interval = params.interval;
          var startPoint = params.begin;
          var nextPoint = startPoint + interval;
          var steps = Math.round((now - startPoint) / interval);
          console.log('begin: ', startPoint, 'interval: ', interval, 'now: ', now, 'steps: ', steps);
          var returnData = {mtgox: [], twitter: []};
          var counter = 0;

          // get mtgox data
          connection.query("SELECT timestamp, AVG(value) FROM marketmovement WHERE site=1 GROUP BY round(timestamp / 60)", 
            function(err, rows, fields) {
              counter++;
              for(var key in rows){
                returnData.mtgox.push([rows[key]['timestamp']*1000, rows[key]['AVG(value)']]);
              }
              if(counter === 2) {
                res.writeHead(200, headers);
                res.end(JSON.stringify(returnData));
              }
            }
          );
          connection.query("SELECT timestamp, sum(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 60)", 
            function(err, rows, fields) {
              counter++;
              for(var key in rows){
                returnData.twitter.push([rows[key]['timestamp']*1000, rows[key]['sum(sentiment)']]);
              }
              if(counter === 2) {
                res.writeHead(200, headers);
                res.end(JSON.stringify(returnData));
              }
            }
          );
          break;
        default:
          // serve up files
          fs.exists(path.resolve(__dirname, lookup), function(exists) {
            if(exists) {
              fs.readFile(path.resolve(__dirname, lookup), function(err, data) {
                if (err) {
                  res.writeHead(500);
                  res.end();
                } else {
                  res.writeHead(200, {"Content-Type": contentType });
                  res.end(data);
                }
              });
            } else {
              res.writeHead(404, headers);
              res.end();
            }
          });
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
