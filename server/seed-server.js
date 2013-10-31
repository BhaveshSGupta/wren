var http = require("http");
var twitter = require('twitter');
var moment = require('moment-timezone');
var mysql = require('mysql');
var mtgox = require('mtgox');
var Topsy = require('node-topsy');
var api = require('../api.config');
var sys = require('sys');
var exec = require('child_process').exec;
var requestHandler = require("./request_handler.js");

// establish database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'little_bird',
  database : 'little_bird',
  charset  : 'utf-32',
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


var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

var scrapeTweets = function() {
  twit.search('bitcoin OR bitcoins', {lang: 'en', count: 100}, function(data) {
    if(data.statuses){
      for(var i = 0; i < data.statuses.length; i++) {
        // closure function to correctly pass 'i' into the callbacks
        var closureFunc = function(i){
          var tweet_id = data.statuses[i].id.toString();
          var username = data.statuses[i].user.screen_name;
          var text = data.statuses[i].text;
          // convert timezone to San Francisco time
          var timestamp = moment(data.statuses[i].created_at).tz("America/Los_Angeles").format('YYYY-MM-DD hh:mm:ss');

          // check if tweet already exists
          connection.query("SELECT 1 FROM Tweets WHERE tweet_id=?", [tweet_id],
            function(err, rows, fields) {
              if(err) {
                console.log(err);
                return;
              }

              // insert into database if doesn't already exist
              if(rows.length === 0) {
                connection.query("INSERT INTO Tweets (username, text, timestamp, tweet_id) VALUES (?, ?, ?, ?)", 
                  [username, text, timestamp, tweet_id, username, timestamp], 
                  function(err, rows, fields) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
            }
          ); 
        };
        closureFunc(i);
      }
    }
    // get hashtag here
  });
};

// get MtGox order depth
var scrapeMtGox = function(){
  gox.market('BTCUSD', function(err, depth) {
    if(depth) {
      var site = 1; // mtgox value in table
      //var timestamp = moment(Math.floor(depth.timestamp / 1000)).tz("America/Los_Angeles").format('YYYY-MM-DD HH:MM:SS'); // convert timestamp to database format
      var timestamp = new Date(depth.timestamp/1000);
      timestamp = moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
      var volume = depth.volume;
      var value = depth.average;
      // need to convert timestamp
      connection.query("SELECT 1 FROM MarketMovement WHERE timestamp=?", [timestamp],
        function(err, rows, fields){
          if(err) {
            console.log(err);
            return;
          }

          // insert into database if doesn't already exist
          if(rows.length === 0) {
            connection.query("INSERT INTO MarketMovement (site, timestamp, volume, value) VALUES (?, ?, ?, ?)", 
              [site, timestamp, volume, value], 
              function(err, rows, fields) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      );
    }
  });
}

// var topsy = new Topsy('YFDRGIFTRJN23G4LG1X2MNEWSKDAL2CU');
// topsy.getSearch({"q": "bitcoins", limit: 20000}, function(error, result) {
//     console.log(result);
// });

function puts(error, stdout, stderr) {
  var output = stderr.split('\n');
  var sentiment;
  for(var i = 0; i < output.length; i++){
    switch(output[i]){
      case "  Predicted sentiment: Very positive":
        sentiment = 4;
        break;
      case "  Predicted sentiment: Positive":
        sentiment = 3;
        break;
      case "  Predicted sentiment: Neutral":
        sentiment = 2;
        break;
      case "  Predicted sentiment: Negative":
        sentiment = 1;
      case "  Predicted sentiment: Very negative":
        sentiment = 0;
        break;
      default:
        break;
    }
  }
  console.log('sentiment:', sentiment);
}

exec('java -cp "deeply_moving/*" -mx5g edu.stanford.nlp.sentiment.SentimentPipeline -file deeply_moving/vpos.txt', puts);

var storeSentiment = function(tweet_id){
  // 1. save message to a file
  connection.query("SELECT * FROM tweets_copy",
    function(err, rows, fields) {
      if(err) {
        console.log(err);
      }
      // only check if sentiment is NULL
      if(rows[0].sentiment === null){
        // create file containing message text

      }
    }
  );
  // 2. run Deeply Moving on the text file
  // 3. parse sentiment
  // 4. store sentiment in Tweet table
  // 5. delete text file
};

storeSentiment();

// Using setInterval() for scraping since cronJob cannot schedule by the second
setInterval(scrapeTweets, 6000);  // Twitter API Rate Limit is 180 requests per 15 min
setInterval(scrapeMtGox, 30500);  // MtGox API Rate Limit is once per 30s