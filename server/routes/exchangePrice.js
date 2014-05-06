'use strict';

var Sequelize = require('sequelize'),
    db        = require('../models');

exports.getAll = function(req, res) {
  db.ExchangePrice.findAll(
    {where: ['timestamp > ?', Math.floor((Date.now() - 1000 * 60 * 60 * 24 * 7)/1000)]} // within one week
  )
  .success(function(tickerPrice) {
    res.send(200, tickerPrice);
  });
};

exports.getExchangePrices = function(req, res) {
  if(req.params.exchange) {

    db.ExchangePrice.findAll(
      { where: Sequelize.and(
        {site: req.params.exchange},
        ['timestamp > ?', Math.floor((Date.now() - 1000 * 60 * 60 * 24 * 7)/1000)] // within one week
      )}
    )
    .success(function(exchangePrices) {
      res.send(200, exchangePrices);
    })
    .error(function(err) {
      res.send(400, {error: err});
    });
  } else {
    console.error('No exchange parameter passed.');
    res.send(400);
  }
};

exports.getTicker = function(req, res) {
  db.ExchangePrice.find(
    {where: {site: 3}, // BTCChina
    attributes: ['value', 'currency'],
    order: 'timestamp DESC',
    limit: 1})
  .success(function(tickerPrice) {
    res.send(200, tickerPrice);
  });
};