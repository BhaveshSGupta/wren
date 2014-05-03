var sequelize  = require('../../server.js').sequelize;
var Sequelize  = require('sequelize');

exports.ExchangePrice = sequelize.define('marketmovement', {
  id:        { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },
  site:      Sequelize.INTEGER,
  volume:    Sequelize.FLOAT(12,2),
  value:     Sequelize.FLOAT(12,2),
  timestamp: Sequelize.BIGINT(11),
  currency:  Sequelize.INTEGER
});