'use strict';

var app = require('./server.js');

module.exports = {
  route: function(app) {
    app.get('/', function(req, res) {
      res.render('index');
    });

    app.get('/buy-price', function(req, res) {
      res.send(200);
    });

    app.get('/prices', function(req, res) {
      res.send(200);
    });

    app.get('/tweets', function(req, res) {
      res.send(200);
    });

    // Handle 404
    app.use(function(req, res) {
      res.send(404, '404: Not Found');
      //res.status(404);
      //res.render('404.html');
    });

    // Handle 500
    app.use(function(error, req, res, next) {
      console.log(error.stack);
      res.send(500, '500: Internal Server Error', {error: error});
    });
  }
};
