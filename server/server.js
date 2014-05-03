'use strict';

var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var Sequelize  = require('sequelize');
var router     = require('./router.js');
// var apis       = require('./helpers/api.js');
var app        = express();

process.env.NODE_ENV = 'test';
if(process.env.NODE_ENV === 'test') {
  app.set('dbUrl', 'localhost');
  app.set('dbPort', 3306);
  app.set('dbUser', 'root');
  app.set('dbPassword', null);
  app.set('dbName', 'wren');
} else {
  app.set('dbUrl', process.env.AMAZON_RDS_HOST || 'localhost');
  app.set('dbPort', process.env.AMAZON_RDS_PORT || 3306);
  app.set('dbUsername', process.env.AMAZON_RDS_USER || 'root');
  app.set('dbPassword', process.env.AMAZON_RDS_PWD || null);
  app.set('dbName', process.env.AMAZON_RDS_DBNAME || 'wren');
}

app.sequelize = new Sequelize(
  app.get('dbName'),
  app.get('dbUser'),
  app.get('dbPassword'),
  {
    host: app.get('dbUrl'),
    port: app.get('dbPort'),
    dialect: 'mysql'//,
    // use pooling in order to reduce db connection overload and to increase speed
    // currently only for mysql and postgresql (since v1.5.0)
    // pool: { maxConnections: 5, maxIdleTime: 30}
  }
);

app.set('port', process.env.PORT || 5000);
// app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
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

