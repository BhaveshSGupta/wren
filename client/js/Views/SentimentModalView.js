'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SentimentModalView = Backbone.View.extend({

  template: this.JST.sentimentFeed,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());
    this.$el.show();

    return this;
  }
});