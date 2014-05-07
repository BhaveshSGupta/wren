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

    console.log(pointClicked.series.currentDataGrouping);
    console.log(startTime, endTime);

    this.sentimentCollection.each(function(sentiment) {
      var timestamp = sentiment.get('timestamp');
      if(timestamp >= startTime && timestamp <= endTime) {
        self.$el.append(new App.Views.SentimentModalListItemView({model: sentiment}).render().el);
      }
    });

    return this;
  }
});