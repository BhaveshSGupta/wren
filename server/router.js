'use strict';

var app = require('./server.js');

module.exports = {
  route: function(app) {
    app.get('/', function(req, res) {
      res.render('index');
    });

    // Handle 404
    app.use(function(req, res) {
      res.status(404);
      res.render('404.html');
    });

    // Handle 500
    app.use(function(error, req, res, next) {
      console.log(error.stack);
      res.send(500, '500: Internal Server Error', {error: error});
    });
  }
};
