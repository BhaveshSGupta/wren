var http = require("http");
var requestHandler = require("./request_handler.js");
var scrapers = require("./helpers/scrapers.js");

var port = process.env.PORT || 5000;

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on port: ", port);
server.listen(port);

// Using setInterval() for scraping since cronJob cannot schedule by the second
// setInterval(scrapers.scrapeTweets, 6000);  
// setInterval(scrapers.scrapeMtGox, 30500);  
// setInterval(scrapers.scrapeBitstamp, 6000); 
setInterval(function() {
  scrapers.scrapeTweets();      // Twitter API Rate Limit is 180 requests per 15 min
  scrapers.scrapeBitstamp();    // Bitstamp rate limit is 600 per 10 minutes
  scrapers.scrapeMtGox();       // MtGox API Rate Limit is once per 30s
  scrapers.scrapeBTCChina();
}, 60000);
