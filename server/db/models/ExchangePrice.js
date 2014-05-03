var sequelize  = require('../../server.js').sequelize;
var Sequelize  = require('sequelize');

exports.ExchangePrice = sequelize.define('marketmovement', {
  id:        Sequelize.STRING,
  site:      Sequelize.INTEGER,
  volume:    Sequelize.FLOAT,
  value:     Sequelize.FLOAT,
  timestamp: Sequelize.INTEGER,
  currency:  Sequelize.FLOAT
});