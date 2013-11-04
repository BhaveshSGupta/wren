var http = require('http');
var twitter = require('twitter');
var fs = require('fs');
var moment = require('moment-timezone');
var mysql = require('mysql');
var mtgox = require('mtgox');
var analyze = require('sentimental').analyze;
var sentiment = require('./sentiment.js');
var api = require('../../api.config');

// establish database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'little_bird',
  database : 'little_bird',
  charset  : 'utf-8',
  multipleStatements: true
});

// Connect to Twitter API
var twit = new twitter({
  consumer_key: api.twitter.key,
  consumer_secret: api.twitter.secret,
  access_token_key: api.twitter.access_token,
  access_token_secret: api.twitter.access_token_secret
});

// connect to MtGox service
var MtGox = require('mtgox');
var gox = new MtGox();
// Key+secret is required to access the private API
gox = new MtGox({
  key: api.mtgox.key,
  secret: api.mtgox.secret
});

// TODO: Refactor the scraper to use the same function call for different services
exports.scrapeTweets = function () {
  twit.search('bitcoin OR bitcoins OR #mtgox OR #bitstamp OR #btce', {lang: 'en', count: 100}, function (data) {
    if (data.statuses) {
      var i;
      var closureFunc = function (i) {
        var tweet_id = data.statuses[i].id.toString();
        var username = data.statuses[i].user.screen_name;
        var text = data.statuses[i].text;
        // remove non-unicode characters (probably better to whitelist what I will accept rather than create a blacklist)
        text = text.replace(/([^\x00-\xFF]|\s)*$/g, '');
        // convert timezone to San Francisco time
        var timestamp = moment(data.statuses[i].created_at).tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss');

        // check that tweet does not already exist
        connection.query("SELECT 1 FROM Tweets WHERE tweet_id=?", [tweet_id],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
              return;
            }

            // insert into database if doesn't already exist
            if (rows.length === 0) {
              // need to throttle or will choke the system
              // var tweet_sentiment = sentiment.calcSentiment(tweet_id, text);
              var tweet_sentiment = analyze(text).score;
              // console.log('text: ', text, 'sentiment: ', analyze(text).score);
              connection.query("INSERT INTO Tweets (username, text, timestamp, sentiment, tweet_id) VALUES (?, ?, ?, ?, ?)",
                [username, text, timestamp, tweet_sentiment, tweet_id],
                function (err, rows, fields) {
                  if (err) {
                    console.log('text causing error: ', text);
                    console.log(err);
                  }
                });
            }
          });
      };
      for (i = 0; i < data.statuses.length; i++) {
        // closure function to correctly pass 'i' into the callbacks
        closureFunc(i);
      }
    }
    // get hashtag here
  });
};

// get MtGox order depth
exports.scrapeMtGox = function () {
  gox.market('BTCUSD', function (err, depth) {
    if (depth) {
      var site = 1; // mtgox value in table
      //var timestamp = moment(Math.floor(depth.timestamp / 1000)).tz("America/Los_Angeles").format('YYYY-MM-DD HH:MM:SS'); // convert timestamp to database format
      var timestamp = new Date(depth.timestamp / 1000);
      timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
      var volume = depth.volume;
      var value = depth.average;
      // need to convert timestamp
      connection.query("SELECT 1 FROM MarketMovement WHERE timestamp=?", [timestamp],
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            return;
          }

          // insert into database if doesn't already exist
          if (rows.length === 0) {
            connection.query("INSERT INTO MarketMovement (site, timestamp, volume, value) VALUES (?, ?, ?, ?)",
              [site, timestamp, volume, value],
              function (err, rows, fields) {
                if (err) {
                  console.log(err);
                }
              });
          }
        });
    }
  });
};