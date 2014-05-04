var db = require('../models');

exports.getTicker = function(req, res) {
  db.ExchangePrice.find(
    {where: {site: 3},
    attributes: ['value'],
    order: 'timestamp DESC',
    limit: 1})
  .success(function(tickerPrice) {
    res.send(200, tickerPrice);
  });
};