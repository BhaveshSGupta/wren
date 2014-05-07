'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SentimentModalItemView = Backbone.View.extend({

  template: this.JST.sentimentModalListItem,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});