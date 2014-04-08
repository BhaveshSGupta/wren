var http = require("http");
var requestHandler = require("./request_handler.js");
var apis = require("./helpers/api.js");

var port = process.env.PORT || 5000;

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on port: ", port);
server.listen(port);

// Using setInterval() for scraping since cronJob cannot schedule by the second
setInterval(function() {
  apis.Tweets();      // Twitter API Rate Limit is 180 requests per 15 min
  // BITCOINS
  apis.Bitstamp();    // Bitstamp rate limit is 600 per 10 minutes
  apis.MtGox();       // MtGox API Rate Limit is once per 30s
  apis.BTCChina();    // No API Rate Limit is listed
  // LITECOINS
  apis.BTCe();        // No listed API Rate Limit
}, 60000);

