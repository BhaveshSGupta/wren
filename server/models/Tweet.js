'use strict';

module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define('Tweet', {
    id:        { type: DataTypes.BIGINT(11).UNSIGNED, primaryKey: true, autoIncrement: true },
    username:  DataTypes.STRING(45),
    text:      DataTypes.STRING(255),
    timestamp: DataTypes.BIGINT(11).UNSIGNED,
    hastag:    DataTypes.STRING,
    sentiment: DataTypes.INTEGER,
    /*jshint camelcase: false */
    tweet_id:  DataTypes.BIGINT(11).UNSIGNED
  });

  return Tweet;
};