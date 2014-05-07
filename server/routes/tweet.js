'use strict';

var db = require('../models');

exports.getAll = function(req, res) {
  db.Tweet.findAll({
      where: ['timestamp > ?', Math.floor((Date.now() - 1000 * 60 * 60 * 24 * 7)/1000)] // within one week
    })
    .success(function(tweets) {
      res.send(200, tweets);
    })
    .error(function(err) {
      console.error(err);
      res.send(400, {error: err});
    });
};