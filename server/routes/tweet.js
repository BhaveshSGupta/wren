var db = require('../models');

exports.getAll = function(req, res) {
  db.Tweet.findAll()
    .success(function(tweets) {
      res.send(200, {tweets: tweets});
    })
    .error(function(err) {
      console.error(err);
      res.send(400, {error: err});
    });
};