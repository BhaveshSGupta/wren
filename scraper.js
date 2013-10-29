var http = require("http");
var url = require("url");
var fs = require("fs");
var MtGox = require('mtgox');
var requestHandler = require("./request_handler.js");
var api = require("./api.config");

var port = 8080;
var ip = "127.0.0.1";

// Key+secret is required to access the private API
var gox = new MtGox({
    key: api.mtGox.key,
    secret: api.mtGox.secret
});

// get market stats
gox.market('BTCUSD', function(err, market) {
  console.log(market);
});

// { bid: '213.00000',
//   ask: '213.89999',
//   last: '213.89999',
//   high: '215.00000',
//   low: '215.00000',
//   volume: '8715.42724897',
//   average: '210.67957',
//   timestamp: 1383081767750544 }

// Get order depth
// gox.depth('BTCUSD', function(err, depth) {
//     console.log(depth);
// });



var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);