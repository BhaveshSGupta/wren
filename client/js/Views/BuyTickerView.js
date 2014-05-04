'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.BuyTickerView = Backbone.View.extend({
  tagName: 'aside',
  className: 'live_data hidden',

  template: this.JST.buyTicker,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});