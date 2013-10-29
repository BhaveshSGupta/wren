var http = require("http");
var url = require("url");
var fs = require("fs");
var csv = require("csv");
var requestHandler = require("./request_handler.js");

var port = 8080;
var ip = "127.0.0.1";

// import data from mtGox CSV
csv()
.from.path(__dirname+'/db/data/mtgoxUSD.csv', { delimiter: ',', escape: '"' })
.transform( function(row){
  row.unshift(row.pop());
  return row;
})
.on('record', function(row,index){
  var volume = row[0];
  var timestamp = row[1];
  var value = row[2];
  console.log('row: ', timestamp, volume, value);
})
.on('close', function(count){
  // when writing to a file, use the 'close' event
  // the 'end' event may fire before the file has been written
  console.log('Number of lines: '+count);
})
.on('error', function(error){
  console.log(error.message);
});

var server = http.createServer(requestHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);