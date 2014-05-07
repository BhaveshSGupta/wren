'use strict';

module.exports = function(sequelize, DataTypes) {
  var Exchange = sequelize.define('Exchange', {
    id:        { type: DataTypes.BIGINT(11).UNSIGNED, primaryKey: true, autoIncrement: true },
    site:      DataTypes.STRING(50),
    currency:  DataTypes.STRING(3),
    url:       DataTypes.STRING(100)
  },{
    timestamps: false
  });

  return Exchange;
};