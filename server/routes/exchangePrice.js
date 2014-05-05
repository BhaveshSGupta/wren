'use strict';

var db = require('../models');

exports.getAll = function(req, res) {
  db.ExchangePrice.findAll(
    {where: ['timestamp > ?', Math.floor((Date.now() - 1000 * 60 * 60 * 24 * 30)/1000)]} // within one month
  )
  .success(function(tickerPrice) {
    res.send(200, tickerPrice);
  });
};

exports.getTicker = function(req, res) {
  db.ExchangePrice.find(
    {where: {site: 3}, // BTCChina
    attributes: ['value', 'currency'],
    order: 'timestamp DESC',
    limit: 1})
  .success(function(tickerPrice) {
    tickerPrice.value = '$' + (tickerPrice.value / 6.2).toFixed(2); // Convert value to USD
    res.send(200, tickerPrice);
  });
};