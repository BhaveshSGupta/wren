'use strict';

var express        = require('express'),
    path           = require('path'),
    bodyParser     = require('body-parser'),
    Sequelize      = require('sequelize'),
    routes         = require('./routes'),
    app            = express();

app.set('port', process.env.PORT || 5000);
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser());

// Routes
app.get('/', routes.index);

module.exports = app;

// Using setInterval() for scraping since cronJob cannot schedule by the second
// setInterval(function() {
//   apis.Tweets();      // Twitter API Rate Limit is 180 requests per 15 min
//   // BITCOINS
//   apis.Bitstamp();    // Bitstamp rate limit is 600 per 10 minutes
//   apis.MtGox();       // MtGox API Rate Limit is once per 30s
//   apis.BTCChina();    // No API Rate Limit is listed
//   // LITECOINS
//   apis.BTCe();        // No listed API Rate Limit
// }, 60000);

