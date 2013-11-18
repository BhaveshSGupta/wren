var url = require('url');
var fs = require('fs');
var path = require('path');
var connection = require('./config/db.js').connection;

// Define CORS headers
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds
  'Content-Type': 'application/json'
};

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
  case '.gif':
    contentType = 'image/gif';
    break;
  case '.png':
    contentType = 'image/png';
    break;
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
              sendResponse(res, {}, 500);
            } else {
              res.writeHead(200, {'Content-Type': contentType });
              res.end(data);
            }
          });
        } else {
          sendResponse(res, {}, 404);
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
          sendResponse(res, JSON.stringify(rows[0].value), 200);
        }
      );
      break;
    case '/tweets':
      var recv = JSON.parse(decodeURIComponent(url.parse(req.url).query, true));
      var begin = recv.begin;
      var end = recv.end;
      // get mtgox data
      connection.query('SELECT timestamp, username, text, sentiment FROM tweets WHERE (timestamp BETWEEN ? AND ?) ORDER BY sentiment DESC',
        [begin, end],
        function(err, rows) {
          if(err){
            console.log(err);
            return;
          }
          sendResponse(res, JSON.stringify(rows), 200);
        }
      );
      break;
    case '/data':
      var returnData = {mtgox: {btc: []},
                        bitstamp: {btc: []},
                        btcchina: {btc: []},
                        btce: {ltc: []},
                        twitter: { btc: { sentiment: [], volume: [] }}
      };
      var counter = 0;
      var totalQueries = 5;
      var one_month_ago = Date.now() - 2678400000;

      // get mtgox data
      connection.query('SELECT timestamp, AVG(value), AVG(volume) FROM marketmovement WHERE site=1 GROUP BY round(timestamp / 300)',
        [one_month_ago],
        function(err, rows) {
          if(err){
            console.log(err);
          }
          for(var key in rows){
            returnData.mtgox.btc.push([rows[key].timestamp*1000, rows[key]['AVG(value)'], rows[key]['AVG(volume)']]);
          }
          counter++;
          if(counter === totalQueries) {
            sendResponse(res, JSON.stringify(returnData), 200);
          }
        }
      );
      // get bitstamp data
      connection.query('SELECT timestamp, AVG(value) FROM marketmovement WHERE site=2 GROUP BY round(timestamp / 300)',
        function(err, rows) {
          if(err){
            console.log(err);
          }
          for(var key in rows){
            returnData.bitstamp.btc.push([rows[key].timestamp*1000, rows[key]['AVG(value)']]);
          }
          counter++;
          if(counter === totalQueries) {
            sendResponse(res, JSON.stringify(returnData), 200);
          }
        }
      );
      // get btc china data
      connection.query('SELECT timestamp, AVG(value) FROM marketmovement WHERE site=3 GROUP BY round(timestamp / 300)',
        function(err, rows) {
          if(err){
            console.log(err);
          }
          for(var key in rows){
            returnData.btcchina.btc.push([rows[key].timestamp*1000, rows[key]['AVG(value)']/6.09]);
          }
          counter++;
          if(counter === totalQueries) {
            sendResponse(res, JSON.stringify(returnData), 200);
          }
        }
      );
      // get btce ltc data
      connection.query('SELECT timestamp, AVG(value) FROM marketmovement WHERE site=4 GROUP BY round(timestamp / 300)',
        function(err, rows) {
          if(err){
            console.log(err);
          }
          for(var key in rows){
            returnData.btce.ltc.push([rows[key].timestamp*1000, rows[key]['AVG(value)']]);
          }
          counter++;
          if(counter === totalQueries) {
            sendResponse(res, JSON.stringify(returnData), 200);
          }
        }
      );
      // get twitter data
      connection.query('SELECT timestamp, SUM(sentiment), COUNT(*) FROM tweets GROUP BY round(timestamp / 300)', // group by one minute
        function(err, rows) {
          if(err){
            console.log(err);
          }
          for(var key in rows){
            returnData.twitter.btc.sentiment.push([rows[key].timestamp*1000, rows[key]['SUM(sentiment)']]);
            returnData.twitter.btc.volume.push([rows[key].timestamp*1000, rows[key]['COUNT(*)']]);
          }
          counter++;
          if(counter === totalQueries) {
            sendResponse(res, JSON.stringify(returnData), 200);
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
              sendResponse(res, {}, 500);
            } else {
              res.writeHead(200, {'Content-Type': contentType });
              res.end(data);
            }
          });
        } else {
          sendResponse(res, {}, 404);
        }
      });
      break;
    }
    break;

  case 'POST':
    sendResponse(res, {}, 200);
    break;
  case 'OPTIONS':
    sendResponse(res, {}, 200);
    break;
  default:
    sendResponse(res, {}, 501);
    break;
  }
};
