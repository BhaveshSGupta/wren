'use strict';

var http       = require('http'),
    app        = require('./server/server'),
    db         = require('./server/models'),
    twitterAPI = require('./server/apis/twitterAPI.js');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Using setInterval() for scraping since cronJob cannot schedule by the second
twitterAPI.getTweets();
setInterval(function() {
  twitterAPI.getTweets();
}, 60000);

// setInterval(function() {
//   apis.Tweets();      // Twitter API Rate Limit is 180 requests per 15 min
//   // BITCOINS
//   apis.Bitstamp();    // Bitstamp rate limit is 600 per 10 minutes
//   apis.MtGox();       // MtGox API Rate Limit is once per 30s
//   apis.BTCChina();    // No API Rate Limit is listed
//   // LITECOINS
//   apis.BTCe();        // No listed API Rate Limit
// }, 60000);