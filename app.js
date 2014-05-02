'use strict';

var http       = require('http');
var server     = require('./server/server.js');

http.createServer(server).listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port') + '...\n');
});