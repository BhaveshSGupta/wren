'use strict';

var db = require('../models'),
    _  = require('lodash'),
    cachedExchangeData = [];

cachedExchangeData.timestamp = Date.now();

exports.getAll = function(req, res) {
  var elapsedTime = Date.now() - cachedExchangeData.timestamp;

  // Serve up cached data if available & within 15 mins recent
  if(cachedExchangeData.length !== 0 && elapsedTime < 1000 * 60 * 15) { // within 15 mins
    res.send(200, cachedExchangeData);
  } else {
    db.Exchange.findAll()
      .success(function(serverData) {
        var exchanges = [];

        _(serverData).each(function(exchange) {
          exchanges.push(exchange.dataValues);
        });

        cachedExchangeData = exchanges;
        cachedExchangeData.timestamp = Date.now();

        res.send(200, exchanges);
      });
  }
};