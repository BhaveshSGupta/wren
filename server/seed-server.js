var http = require("http");
var cronJob = require('cron').CronJob;
var twitter = require('twitter');
var moment = require('moment-timezone');
var mysql = require('mysql');
var api = require('../api.config');
var requestHandler = require("./request_handler.js");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'little_bird',
  database : 'little_bird',
  multipleStatements: true
});

// Connect to Twitter API
var twit = new twitter({
  consumer_key: api.twitter.key,
  consumer_secret: api.twitter.secret,
  access_token_key: api.twitter.access_token,
  access_token_secret: api.twitter.access_token_secret
});

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

var scrapeTweets = function() {
  twit.search('bitcoin', {count: 100}, function(data) {
    for(var i = 0; i < data.statuses.length; i++) {
      var username = data.statuses[i].user.screen_name;
      var text = data.statuses[i].text;
      // convert timezone to San Francisco time
      var timestamp = moment(data.statuses[i].created_at).tz("America/Los_Angeles").format('YYYY-MM-DD HH:MM:SS');
      connection.query("INSERT INTO Tweets (username, text, timestamp) VALUES (?, ?, ?)", 
        [username, text, timestamp], 
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
};

var job = new cronJob('06 * * * * *', function(){
    scrapeTweets();
  }, function () {
    console.log('Cache updated');
  },
  true /* Start the job right now */
);