'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SentimentModalListView = Backbone.View.extend({
  tagName: 'ul',

  template: this.JST.sentimentModalListView,

  initialize: function(options) {
    _(this).extend(options);
    this.sentimentCollection = this.sentimentCollection || {};
  },

  render: function(options) {
    var self = this,
        pointClicked = options.point || {},
        startTime = pointClicked.x,
        endTime = startTime + pointClicked.series.currentDataGrouping.unitRange;

    this.$el.html(this.template());

    // Find start and end indexes for sentiments represented by point clicked
    var sentimentIndexRange = this.retrieveSentimentIndexRange(startTime, endTime);
    // Filter out sentiments within time range
    var filteredSentiments = this.sentimentCollection.models.slice(sentimentIndexRange.startIndex, sentimentIndexRange.endIndex + 1);

    this.sortBySentiment({collection: filteredSentiments, order: 'desc'});

    _(filteredSentiments).each(function(sentiment) {
      self.$el.append(new App.Views.SentimentModalListItemView({model: sentiment}).render().el);
    });

    return this;
  },

  retrieveSentimentIndexRange: function(startTime, endTime) {
    // This function returns the collection index range for relevant sentiments
    // If a sentiment's timestamp falls between the start and end times, it is within the range

    var indexRange = {
      startIndex: null,
      endIndex: null
    };

    this.sentimentCollection.each(function(sentiment, index) {
      var timestamp = sentiment.get('timestamp');
      if(timestamp >= startTime && timestamp <= endTime) {
        if(indexRange.startIndex === null) {
          indexRange.startIndex = index;
        }
        indexRange.endIndex = index;
      }
    });

    return indexRange;
  },

  sortBySentiment: function(options) {
    options.collection = options.collection || [];
    options.order = options.order.toLowerCase() || 'desc';
    var orderToggle = 1;

    // Flip the return value if order is not 'desc'
    if(options.order !== 'desc') {
      orderToggle = -1;
    }

    options.collection.sort(function(a, b) {
      var aSentiment  = a.get('sentiment');
      var bSentiment  = b.get('sentiment');

      if(aSentiment < bSentiment) {
        return 1 * orderToggle;
      } else if(aSentiment > bSentiment) {
        return -1 * orderToggle;
      } else {
        return 0;
      }
    });
  }
});