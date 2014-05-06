'use strict';

// var ExchangePrice = require('./ExchangePrice');

module.exports = function(sequelize, DataTypes) {
  var Exchange = sequelize.define('Exchange', {
    id:        { type: DataTypes.BIGINT(11).UNSIGNED, primaryKey: true, autoIncrement: true },
    site:      DataTypes.STRING(50),
    currency:  DataTypes.STRING(3)
  },{
    timestamps: false
  });

  // Exchange.hasMany(ExchangePrice, {as: 'ExchangePrices'});

  return Exchange;
};