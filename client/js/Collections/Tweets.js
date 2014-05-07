var App = App || {};
App.Collections = App.Collections || {};

(function(){
  'use strict';

  App.Collections.Tweets = Backbone.Collection.extend({
    model: App.Models.Tweet,
    url: '/tweets/',

    initialize: function() {
      this.on('sync', this.createHighStocksData, this);
      this.data = [];
      this.isVisible = true;
    },

    createHighStocksData: function() {
      // [timestamp, value] format required by HighStocks
      var self = this;

      if(this.data.length !== 0) {
        this.data = [];
      }

      // Smooth Twitter data with Simple Moving Average
      var sma2 = Stats.simpleMovingAverage(432); // 2 days

      this.each(function(tweet) {
        var smoothedSentiment = sma2(tweet.get('sentiment'));

        self.data.push([tweet.get('timestamp'), smoothedSentiment]);
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

})();