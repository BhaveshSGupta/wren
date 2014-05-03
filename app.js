'use strict';

var http       = require('http'),
    app        = require('./server/server.js'),
    db         = require('./server/models');

db
  .sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err[0];
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });