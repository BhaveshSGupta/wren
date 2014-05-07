'use strict';

var http        = require('http'),
    app         = require('./server/server'),
    db          = require('./server/models'),
    btcChinaAPI = require('./server/apis/btcChinaAPI.js'),
    bitstampAPI = require('./server/apis/bitstampAPI.js'),
    btceAPI     = require('./server/apis/btceAPI.js'),
    twitterAPI  = require('./server/apis/twitterAPI.js');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

if(process.env.NODE_ENV === 'production') {
  // Retrieve data from 3rd Party APIs
  setInterval(function() {
    // CryptoCurrency APIs
    bitstampAPI.getExchangePrices();  // Bitstamp rate limit is 600 per 10 minutes
    btcChinaAPI.getExchangePrices();  // No API Rate Limit is listed
    btceAPI.getExchangePrices();      // No API Rate Limit is listed

    // Twitter API
    twitterAPI.getTweets();           // Twitter API Rate Limit is 180 requests per 15 min
  }, 60000);
}
