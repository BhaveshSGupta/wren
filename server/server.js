'use strict';

var http            = require('http'),
    express         = require('express'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    Sequelize       = require('sequelize'),
    db              = require('./models'),
    routes          = require('./routes'),
    exchanges       = require('./routes/exchanges'),
    exchangePrices  = require('./routes/exchangePrice'),
    tweet           = require('./routes/tweet'),
    app             = express(),
    staticAssetPath = '../client';

if(process.env.NODE_ENV === 'production') {
  staticAssetPath = '../dist';
}

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, staticAssetPath));
app.engine('html', require('ejs').__express);
app.use(express.static(path.join(__dirname, staticAssetPath)));
app.use(bodyParser());

// Routes
app.get('/', routes.index);
app.get('/tweets', tweet.getAll);
app.get('/exchanges', exchanges.getAll);
app.get('/buy-ticker', exchangePrices.getTicker);
app.get('/prices', exchangePrices.getAll);
app.get('/prices/:exchange', exchangePrices.getExchangePrices);

// Handle 404
app.use(function(req, res) {
  res.status(404);
  res.render('404.html');
});

// Handle 500
app.use(function(error, req, res, next) {
  console.error(error.stack);
  res.send(500, '500: Internal Server Error', {error: error});
});

module.exports = app;
