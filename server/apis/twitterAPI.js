'use strict';

var _        = require('lodash');
var twitter  = require('twitter');
var moment   = require('moment');
var analyze  = require('Sentimental').analyze;
var db       = require('../models');

var maxTweetIdSeen = null;

// Connect to Twitter API
var twit = new twitter({
  /*jshint camelcase: false */
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.getTweets = function () {
  var searchOptions = {lang: 'en', count: 100};

  // Only retrieve tweets since last seen tweet
  if(maxTweetIdSeen !== null) {
    searchOptions.since_id = maxTweetIdSeen;
  }

  twit.search('bitcoin OR bitcoins OR #mtgox OR #bitstamp OR #btce OR #btcchina', searchOptions, function (data) {

    maxTweetIdSeen = data.search_metadata.max_id; // Reassign max tweet id seen

    if(data.statuses) {
      _(data.statuses).each(function(tweet, i) {
        var thisTweet = {
          tweet_id: data.statuses[i].id.toString(),
          username: data.statuses[i].user.screen_name,
          text: data.statuses[i].text,
          timestamp: moment(data.statuses[i].created_at).format('YYYY-MM-DD HH:mm:ss')
        };

        // Remove symbols (such as hearts and palm trees) for sentiment analysis
        thisTweet.text = thisTweet.text.replace(/([^\x00-\xFF]|\s)*$/g, '');
        thisTweet.timestamp = Math.floor(Date.parse(thisTweet.timestamp)/1000);
        thisTweet.sentiment = analyze(thisTweet.text).score;

        db.Tweet.findOrCreate(thisTweet)
          .success(function() {
            console.log('Tweet successfully inserted! id:', thisTweet.tweet_id);
          })
          .error(function(err) {
            console.error(err);
          });
      });
    }


  });
};
