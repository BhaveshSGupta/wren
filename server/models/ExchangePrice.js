module.exports = function(sequelize, DataTypes) {
  var ExchangePrice = sequelize.define('ExchangePrice', {
    id:        { type: DataTypes.BIGINT(11).UNSIGNED, primaryKey: true, autoIncrement: true },
    site:      DataTypes.INTEGER.UNSIGNED,
    volume:    DataTypes.FLOAT(12,2),
    value:     DataTypes.FLOAT(12,2).UNSIGNED,
    timestamp: DataTypes.BIGINT(11).UNSIGNED,
    currency:  DataTypes.INTEGER.UNSIGNED
  });

  return ExchangePrice;
};