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

    // Data must be sorted for HighStocks
    // Sorting on client to remove load from DB
    this.data.sort(function(a,b) {
      // 0-index element is the timestamp
      if(a[0] < b[0]) {
        return -1;
      } else if(a[0] > b[0]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
});