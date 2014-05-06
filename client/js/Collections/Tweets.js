'use strict';

var App = App || {};
App.Collections = App.Collections || {};

App.Collections.Tweets = Backbone.Collection.extend({
  model: App.Models.Tweet,
  url: '/tweets/',

  initialize: function() {
    this.on('sync', this.createHighStocksData, this);
    this.data = [];
  },

  createHighStocksData: function() {
    // [timestamp, value] format required by HighStocks
    var self = this;

    if(this.data.length !== 0) {
      this.data = [];
    }

    this.each(function(tweet) {
      self.data.push([tweet.get('timestamp'), tweet.get('sentiment')]);
    });

    console.log('tweetData', this.data);
  }
});