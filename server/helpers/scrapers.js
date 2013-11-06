var http = require('http');
var twitter = require('twitter');
var fs = require('fs');
var moment = require('moment-timezone');
var mysql = require('mysql');
var mtgox = require('mtgox');
var Bitstamp = require('bitstamp-request');
var analyze = require('sentimental').analyze;
var sentiment = require('./sentiment.js');
var api = require('../../api.config');

// establish database connection
var connection = mysql.createConnection({
  host     : 'littlebird.c0eactkzzr6c.us-west-2.rds.amazonaws.com',
  port     : '3306',
  user     : api.rds.user,
  password : api.rds.pwd,
  database : 'wren',
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

// Key+secret is required to access the private API
var gox = new mtgox({
  key: api.mtgox.key,
  secret: api.mtgox.secret
});


// Connect to Bitstamp
// var privateBitstamp = new Bitstamp(api.bitstamp.key, api.bitstamp.secret, api.bitstamp.clientID);
var privateBitstamp = new Bitstamp(api.bitstamp.clientID, api.bitstamp.key, api.bitstamp.secret);

// TODO: Refactor the scraper to use the same function call for different services
exports.scrapeTweets = function () {
  twit.search('bitcoin OR bitcoins OR #mtgox OR #bitstamp OR #btce', {lang: 'en', count: 100}, function (data) {
    if (data.statuses) {
      var closureFunc = function (i) {
        var tweet_id = data.statuses[i].id.toString();
        var username = data.statuses[i].user.screen_name;
        var text = data.statuses[i].text;
        // remove non-unicode characters (probably better to whitelist what I will accept rather than create a blacklist)
        text = text.replace(/([^\x00-\xFF]|\s)*$/g, '');
        // convert timezone to San Francisco time
        var timestamp = moment(data.statuses[i].created_at).tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss');

        // check that tweet does not already exist
        connection.query("SELECT 1 FROM tweets WHERE tweet_id=?", [tweet_id],
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
              connection.query("INSERT INTO tweets (username, text, timestamp, sentiment, tweet_id) VALUES (?, ?, ?, ?, ?)",
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
      for (var i = 0; i < data.statuses.length; i++) {
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
      connection.query("SELECT 1 FROM marketmovement WHERE site=1 AND timestamp=?", [timestamp],
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            return;
          }

          // insert into database if doesn't already exist
          if (rows.length === 0) {
            connection.query("INSERT INTO marketmovement (site, timestamp, volume, value) VALUES (?, ?, ?, ?)",
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

// Scrape Bitstamp
exports.scrapeBitstamp = function () {
  privateBitstamp.get('https://www.bitstamp.net/api/ticker/', function(err, response){
    // console.log(JSON.parse(response.req.res.body).timestamp);
    if(response) {
      var site = 2; // bitstamp value in table
      var response = JSON.parse(response.req.res.body);
      var timestamp = new Date(response.timestamp * 1000);
      timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
      var volume = response.volume;
      var value = response.last;
      connection.query("SELECT 1 FROM marketmovement WHERE site=2 AND timestamp=?", [timestamp],
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            return;
          }

          // insert into database if doesn't already exist
          if (rows.length === 0) {
            connection.query("INSERT INTO marketmovement (site, timestamp, volume, value) VALUES (?, ?, ?, ?)",
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