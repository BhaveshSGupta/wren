var http = require("http");

var Topsy = require('node-topsy');
var api = require('../api.config');

var requestHandler = require("./request_handler.js");
var sentiment = require("./sentiment.js");

var port = 8081;
var ip = "127.0.0.1";

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// var topsy = new Topsy('YFDRGIFTRJN23G4LG1X2MNEWSKDAL2CU');
// topsy.getSearch({"q": "bitcoins", limit: 20000}, function(error, result) {
//     console.log(result);
// });

sentiment.storeSentiment();