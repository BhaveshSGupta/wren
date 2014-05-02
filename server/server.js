'use strict';

var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var router     = require('./router.js');
var apis       = require('./helpers/api.js');
// var db         = require('./config/dbconfig.js');
var app        = express();

// db(app);

app.set('port', process.env.PORT || 3000);
app.engine('jade', require('jade').__express);
// app.set('views', path.join(__dirname, staticAssetPath));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser());

router.route(app);

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

