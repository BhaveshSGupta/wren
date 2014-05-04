'use strict';

var http           = require('http'),
    app            = require('./server/server'),
    db             = require('./server/models');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// db
//   .sequelize
//   .sync()
//   .complete(function(err) {
//     if (err) {
//       throw err[0];
//     } else {
//       http.createServer(app).listen(app.get('port'), function(){
//         console.log('Express server listening on port ' + app.get('port'));
//       });
//     }
//   });