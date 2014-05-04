'use strict';

var db = require('../models');

exports.getAll = function(req, res) {
  db.Tweet.findAll({where: ["timestamp > ?", Date.now() - 1000 * 60 * 60 * 24 * 30]})
    .success(function(tweets) {
      res.send(200, {tweets: tweets});
    })
    .error(function(err) {
      console.error(err);
      res.send(400, {error: err});
    });
};