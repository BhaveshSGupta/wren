var https = require('https');
var twitter = require('twitter');
var moment = require('moment');
var mtgox = require('mtgox');
var Bitstamp = require('bitstamp-request');
var analyze = require('Sentimental').analyze;
var connection = require('./db.js').connection;

// Connect to Twitter API
var twit = new twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// TODO: Refactor the scraper to use the same function call for different services
exports.scrapeTweets = function () {
  twit.search('bitcoin OR bitcoins OR #mtgox OR #bitstamp OR #btce', {lang: 'en', count: 100}, function (data) {
    if (data.statuses) {
      var closureFunc = function (i) {
        var tweet_id = data.statuses[i].id.toString();
        var username = connection.escape(data.statuses[i].user.screen_name);
        var text = connection.escape(data.statuses[i].text);
        // TODO: whitelist characters instead of blacklist
        // remove non-unicode characters (probably better to whitelist what I will accept rather than create a blacklist)
        text = text.replace(/([^\x00-\xFF]|\s)*$/g, '');
        
        var timestamp = moment(data.statuses[i].created_at).format('YYYY-MM-DD HH:mm:ss');
        timestamp = Math.floor(Date.parse(timestamp)/1000);

        // check that tweet does not already exist
        connection.query('SELECT 1 FROM tweets WHERE tweet_id=?', [tweet_id],
          function (err, rows) {
            if (err) {
              console.log(err);
              return;
            }

            // insert into database if doesn't already exist
            if (rows.length === 0) {
              var tweet_sentiment = analyze(text).score;
              connection.query('INSERT INTO tweets (username, text, timestamp, sentiment, tweet_id) VALUES (?, ?, ?, ?, ?)',
                [username, text, timestamp, tweet_sentiment, tweet_id],
                function (err) {
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
    
  });
};

// MTGOX key+secret required to access the private API
var gox = new mtgox({
  key: process.env.MTGOX_KEY,
  secret: process.env.MTGOX_SECRET
});

// get MtGox order depth
exports.scrapeMtGox = function () {
  gox.market('BTCUSD', function (err, depth) {
    if (depth) {
      var site = 1; // mtgox value in table
      var timestamp = Math.floor(depth.timestamp / 1000000);
      var volume = depth.volume;
      var value = depth.bid;
      var currency = 1; // USD
      connection.query('SELECT 1 FROM marketmovement WHERE site=1 AND timestamp=?', [timestamp],
        function (err, rows) {
          if (err) {
            console.log(err);
            return;
          }
          // insert into database if doesn't already exist
          if (rows.length === 0) {
            connection.query('INSERT INTO marketmovement (site, volume, value, timestamp, currency) VALUES (?, ?, ?, ?, ?)',
              [site, volume, value, timestamp, currency],
              function (err) {
                if (err) {
                  console.log(err);
                  return;
                }

              });
          }
        });
    }
  });
};

// Connect to Bitstamp
var privateBitstamp = new Bitstamp(process.env.BITSTAMP_CLIENTID, process.env.BITSTAMP_KEY, process.env.BITSTAMP_SECRET);

// Scrape Bitstamp
exports.scrapeBitstamp = function () {
  privateBitstamp.get('https://www.bitstamp.net/api/ticker/', function(err, response){
    if(response) {
      var site = 2; // bitstamp value in table
      try {
        response = JSON.parse(response.req.res.body);
      } catch(e) {
        console.log(response.req.res.body);
        console.log(e);
        return;
      }
      var timestamp = response.timestamp;
      var volume = response.volume;
      var value = response.bid;
      var currency = 1; // USD
      connection.query('SELECT 1 FROM marketmovement WHERE site=2 AND timestamp=?', [timestamp],
        function (err, rows) {
          if (err) {
            console.log(err);
            return;
          }
          // insert into database if doesn't already exist
          if (rows.length === 0) {
            connection.query('INSERT INTO marketmovement (site, volume, value, timestamp, currency) VALUES (?, ?, ?, ?, ?)',
              [site, volume, value, timestamp, currency],
              function (err) {
                if (err) {
                  console.log(err);
                  return;
                }
              });
          }
        });
    }
  });
};

// TODO: Move this into a helper file
var collectData = function(request, callback){
  var data = '';
  request.on('error', function(err){
    console.log('ERROR: ' + err.message);
  });
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

// Scrape BTC China
exports.scrapeBTCChina = function () {
  https.get('https://data.btcchina.com/data/ticker', function(res) {
    collectData(res, function(data) {
      try {
        data = (JSON.parse(data)).ticker;
      } catch(e) {
        console.log(e);
      }
      var site = 3; // BTCChina
      var buy = data.buy;
      var volume = parseFloat(data.vol, 10).toFixed(2);
      var timestamp = Math.floor(new Date() / 1000);   // need to assign the timestamp myself
      var currency = 2; // value of RMB
      connection.query('INSERT INTO marketmovement (site, volume, value, timestamp, currency) VALUES (?, ?, ?, ?, ?)',
        [site, volume, buy, timestamp, currency],
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });
};