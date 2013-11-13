var url = require('url');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var moment = require('moment');


// Define CORS headers
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds
  'Content-Type': 'application/json'
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

exports.eventHandler = function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var pathName = url.parse(req.url).pathname;
  var lookup = '../client/index.html';

  if (pathName === '/') {
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
    contentType = 'text/javascript';
    break;
  case '.css':
    contentType = 'text/css';
    break;
  case '.ttf':
    contentType = 'font/ttf';
    break;
  case '.gif':
    contentType = 'image/gif';
  default:
    contentType = 'text/html';
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
              res.writeHead(200, {'Content-Type': contentType });
              res.end(data);
            }
          });
        } else {
          res.writeHead(404, headers);
          res.end();
        }
      });
      break;
    case '/buy-ticker':
      // get latest value from MtGox
      connection.query('SELECT value FROM marketmovement WHERE site=1 ORDER BY timestamp DESC LIMIT 1',
        function(err, rows) {
          if(err){
            console.log(err);
            return;
          }
          res.writeHead(200, headers);
          res.end(JSON.stringify(rows[0].value));
        }
      );
      break;
    case '/tweets':
      var timestamp = JSON.parse(decodeURIComponent(url.parse(req.url).query, true));
      console.log('timestamp: ', timestamp);
      // get mtgox data
      connection.query('SELECT timestamp, username, text, sentiment FROM tweets WHERE (timestamp BETWEEN ? AND ?) ORDER BY sentiment DESC',
        [timestamp, timestamp + 300],
        function(err, rows) {
          if(err){
            console.log(err);
            return;
          }
          res.writeHead(200, headers);
          res.end(JSON.stringify(rows));
        }
      );
      break;
    case '/data':
      var returnData = {mtgox: [],
                        bitstamp: [],
                        btcchina: [],
                        twitter: { five_min: [],
                                   ten_min: [],
                                   thirty_min: [],
                                   one_hour: [],
                                   three_hour: [],
                                   six_hour: [],
                                   twelve_hour: [],
                                   one_day: [],
                                   three_day: []
                                 }
      };
      var counter = 0;
      var totalQueries = 12;

      // get mtgox data
      connection.query('SELECT timestamp, AVG(value), AVG(volume) FROM marketmovement WHERE site=1 GROUP BY round(timestamp / 60)',
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.mtgox.push([rows[key].timestamp*1000, rows[key]['AVG(value)'], rows[key]['AVG(volume)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      // get bitstamp data
      connection.query('SELECT timestamp, AVG(value) FROM marketmovement WHERE site=2 GROUP BY round(timestamp / 60)',
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.bitstamp.push([rows[key].timestamp*1000, rows[key]['AVG(value)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      // get btc china data
      connection.query('SELECT timestamp, AVG(value) FROM marketmovement WHERE site=3 GROUP BY round(timestamp / 60)',
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.btcchina.push([rows[key].timestamp*1000, rows[key]['AVG(value)']/6.09]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      // get twitter data
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 300)', // group by 5 minutes
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.five_min.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 600)', // group by 10 minutes
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.ten_min.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 1800)', // group by 30 minutes
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.thirty_min.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 3600)', // group by 1 hr
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.one_hour.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 10800)', // group by 3 hrs
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.three_hour.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 21600)', // group by 6 hrs
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.six_hour.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 43200)', // group by 12 hrs
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.twelve_hour.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 86400)', // group by 1 day
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.one_day.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(returnData));
          }
        }
      );
      connection.query('SELECT timestamp, SUM(sentiment), count(*) FROM tweets GROUP BY round(timestamp / 259200)', // group by 3 days
        function(err, rows) {
          counter++;
          for(var key in rows){
            returnData.twitter.three_day.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
          }
          if(counter === totalQueries) {
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
              res.writeHead(200, {'Content-Type': contentType });
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
    res.end('POST method received');
    break;
  case 'OPTIONS':
    res.writeHead(200, headers);
    res.end('OPTIONS method received');
    break;
  default:
    res.writeHead(501, headers);
    res.end('Unrecognized request method');
    break;
  }
};
