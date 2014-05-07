'use strict';

var db              = require('../models'),
    cachedTweetData = [];

cachedTweetData.timestamp = Date.now();

exports.getAll = function(req, res) {
  var elapsedTime = Date.now() - cachedTweetData.timestamp;

  // Serve up cached data if available & within 15 mins recent
  if(cachedTweetData.length !== 0 && elapsedTime < 1000 * 60 * 15) { // within 15 minutes
    res.send(200, cachedTweetData);
  } else {
    db.Tweet.findAll({
        where: ['timestamp > ?', Math.floor((Date.now() - 1000 * 60 * 60 * 24 * 7)/1000)] // within one week
      })
      .success(function(tweets) {
        cachedTweetData = tweets;
        cachedTweetData.timestamp = Date.now();

        res.send(200, tweets);
      })
      .error(function(err) {
        console.error(err);
        res.send(400, {error: err});
      });
  }

};