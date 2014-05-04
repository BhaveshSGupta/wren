'use strict';

var http           = require('http'),
    express        = require('express'),
    path           = require('path'),
    bodyParser     = require('body-parser'),
    Sequelize      = require('sequelize'),
    db             = require('./models'),
    routes         = require('./routes'),
    tweet          = require('./routes/tweet'),
    exchangePrices = require('./routes/exchangePrice'),
    app            = express();

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, '../client/views'));
app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser());

// Routes
app.get('/', routes.index);
app.get('/tweets', tweet.getAll);
app.get('/buy-ticker', exchangePrices.getTicker);
app.get('/prices', exchangePrices.getAll);

// Handle 404
app.use(function(req, res) {
  res.send(404, '404: Not Found');
});

// Handle 500
app.use(function(error, req, res, next) {
  console.error(error.stack);
  res.send(500, '500: Internal Server Error', {error: error});
});

module.exports = app;
