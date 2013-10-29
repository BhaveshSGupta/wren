var http = require("http");
var url = require("url");
var fs = require("fs");
var requestHandler = require("./request_handler.js");

var port = 8080;

var ip = "127.0.0.1";

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);