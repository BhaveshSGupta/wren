'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.TwitterFeedView = Backbone.View.extend({

  template: this.JST.twitterFeed,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});