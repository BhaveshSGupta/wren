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

  // console.log('pathName: ', pathName);
  // console.log('path: ', path.resolve(__dirname, lookup));

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
          // get Tweet data
          var beginning_timedelta = decodeURIComponent(url.parse(req.url).query, true);
          var next_timedelta = moment(moment(beginning_timedelta) + 1800000).format('YYYY-MM-DD HH:mm:ss');
          var timeDeltas = {mtgox: {volume: {}, value: {}}, tweets: { total: {}, sentiment: {}}};
          var exchangeCounter = 0;
          var tweetCounter = 0;
          
          var closureFunc = function(i, begin, next){
            connection.query("SELECT AVG(value) FROM marketmovement WHERE (timestamp BETWEEN ? AND ?)", [begin, next], 
              function(err, rows, fields) {
                exchangeCounter++;
                var avg = rows[0]['AVG(value)'];
                
                timeDeltas.mtgox.value[i] = avg;

                if(exchangeCounter === 12 && tweetCounter === 12){
                  res.writeHead(200, headers);
                  res.end(JSON.stringify(timeDeltas));  
                }
              }
            );
            connection.query("SELECT SUM(sentiment) FROM tweets WHERE (timestamp BETWEEN ? AND ?)", [begin, next], 
              function(err, rows, fields) {
                tweetCounter++;
                var sentiment = rows[0]['SUM(sentiment)'];
                timeDeltas.tweets.sentiment[i] = sentiment;
                if(exchangeCounter === 12 && tweetCounter === 12){
                  res.writeHead(200, headers);
                  res.end(JSON.stringify(timeDeltas));  
                }
              }
            );
          };

          for(var i = 0; i < 12; i++){
            closureFunc(i, beginning_timedelta, next_timedelta);
            beginning_timedelta = next_timedelta;
            next_timedelta = moment(moment(beginning_timedelta) + 1800000).format('YYYY-MM-DD HH:mm:ss');
          }
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
