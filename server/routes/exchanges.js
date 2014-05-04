'use strict';

var db = require('../models');
var _  = require('lodash');

exports.getAll = function(req, res) {
  db.Exchange.findAll()
    .success(function(serverData) {
      var exchanges = [];

      _(serverData).each(function(exchange) {
        exchanges.push(exchange.dataValues);
      });

      res.send(200, exchanges);
    });
};