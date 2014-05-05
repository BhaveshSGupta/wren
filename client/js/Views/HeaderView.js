'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.HeaderView = Backbone.View.extend({
  tagName: 'header',
  className: 'topbar',

  template: this.JST.header,

  initialize: function(options) {
    this.buyTickerView = new App.Views.BuyTickerView();
  },

  render: function() {
    this.$el.html(this.template());
    this.$el.append(this.buyTickerView.render().el);

    return this;
  }
});