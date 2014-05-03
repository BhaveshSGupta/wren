'use strict';

var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    lodash    = require('lodash'),
    app       = require('../server.js'),
    db        = {};

var sequelize = new Sequelize(
  process.env.AMAZON_RDS_DBNAME || 'wren',
  process.env.AMAZON_RDS_USER || 'root',
  process.env.AMAZON_RDS_USER || null,
  {
    host: process.env.AMAZON_RDS_HOST || 'localhost',
    port: process.env.AMAZON_RDS_PORT || 3306,
    dialect: 'mysql',
    logging: false
    // use pooling in order to reduce db connection overload and to increase speed
    // currently only for mysql and postgresql (since v1.5.0)
    // pool: { maxConnections: 5, maxIdleTime: 30}
  });

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);