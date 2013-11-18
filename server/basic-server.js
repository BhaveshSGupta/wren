var http = require("http");
var requestHandler = require("./request_handler.js");
var scrapers = require("./helpers/scrapers.js");

var port = process.env.PORT || 5000;

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on port: ", port);
server.listen(port);

// Using setInterval() for scraping since cronJob cannot schedule by the second
setInterval(function() {
  scrapers.scrapeTweets();      // Twitter API Rate Limit is 180 requests per 15 min
  // BITCOINS
  scrapers.scrapeBitstamp();    // Bitstamp rate limit is 600 per 10 minutes
  scrapers.scrapeMtGox();       // MtGox API Rate Limit is once per 30s
  scrapers.scrapeBTCChina();    // No API Rate Limit is listed
  // LITECOINS
  scrapers.scrapeBTCe();        // No listed API Rate Limit
}, 60000);

