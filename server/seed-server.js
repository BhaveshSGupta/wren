var http = require("http");
var twitter = require('twitter');
var moment = require('moment-timezone');
var mysql = require('mysql');
var JAVA = require('java');
var StanfordSimpleNLP = require('stanford-simple-nlp').StanfordSimpleNLP;
var api = require('../api.config');
var requestHandler = require("./request_handler.js");

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

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

var scrapeTweets = function() {
  twit.search('bitcoin', {count: 100}, function(data) {
    if(data){
      for(var i = 0; i < data.statuses.length; i++) {
        var username = data.statuses[i].user.screen_name;
        var text = data.statuses[i].text;
        // convert timezone to San Francisco time
        var timestamp = moment(data.statuses[i].created_at).tz("America/Los_Angeles").format('YYYY-MM-DD HH:MM:SS');
        
        // check if tweet already exists
        connection.query("SELECT 1 FROM Tweets WHERE username=? AND timestamp=?", [username, timestamp],
          function(err, rows, fields) {
            if(err) {
              console.log(err);
              return;
            }
            // insert into database if doesn't already exist
            if(rows.length === 0) {
              connection.query("INSERT INTO Tweets (username, text, timestamp) VALUES (?, ?, ?)", 
                [username, text, timestamp, username, timestamp], 
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
    }
    // get hashtag here
    // need to convert timestamp to the proper timezone  
  });
};

// Using setInterval() for scraping since cronJob cannot schedule by the second
setInterval(scrapeTweets, 6000);

// var options = {
//   annotators: ['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'dcoref']
// };

// var stanfordSimpleNLP = new StanfordSimpleNLP(function(err) {
//   stanfordSimpleNLP.process('This is so good.', function(err, result) {
//     if(err) {
//       console.log('err:', err);
//     }
//     console.log('success: ', result.document.sentences.sentence);
//   });
// });