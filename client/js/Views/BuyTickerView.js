'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.BuyTickerView = Backbone.View.extend({
  tagName: 'aside',
  className: 'live_data hidden',

  template: this.JST.buyTicker,

  initialize: function(options) {
    this.model = new App.Models.ExchangePrice({url: '/buy-ticker'});
    this.model.fetch();

    this.model.on('change', this.render, this);
  },

  render: function() {
    console.log(this.model.toJSON());
    this.$el.html(this.template({model: this.model.toJSON()}));

    return this;
  }
});