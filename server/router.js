'use strict';

var app = require('./server.js');

module.exports = {
  route: function(app) {
    app.get('/', function(req, res) {
      res.render('index');
    });

    app.get('/buy-ticker', function(req, res) {
      console.log('GET Request for /buy-ticker');
      app.sequelize.query('SELECT value FROM marketmovement WHERE site=3 ORDER BY timestamp DESC LIMIT 1')
      .success(function(rows) {
        var buyPrice = rows[0].value / 6.2; // approximately convert value into USD
        res.send(200, {buyPrice: buyPrice});
      })
      .error(function(err) {
        console.log(err);
        res.send(400, {error: err});
      });
    });

    app.get('/prices', function(req, res) {
      res.send(200);
    });

    app.get('/tweets', function(req, res) {
      app.sequelize.query('SELECT timestamp, username, text, sentiment FROM tweets LIMIT 10'/* WHERE (timestamp BETWEEN ? AND ?) ORDER BY sentiment DESC'*/)
      .success(function(rows) {
        res.send(200, {tweets: rows});
      })
      .error(function(err) {
        res.send(400, {error: err});
      });
    });

    // Handle 404
    app.use(function(req, res) {
      res.send(404, '404: Not Found');
      //res.status(404);
      //res.render('404.html');
    });

    // Handle 500
    app.use(function(error, req, res, next) {
      console.error(error.stack);
      res.send(500, '500: Internal Server Error', {error: error});
    });
  }
};
