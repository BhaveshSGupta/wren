'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ExchangeCollectionView = Backbone.View.extend({
  tagName: 'section',
  className: 'exchanges',

  template: this.JST.exchangeCollectionView,

  initialize: function(options) {
    _(this).extend(options);

    this.exchangeCollection.on('sync', this.render, this);
  },

  render: function() {
    var self = this;

    this.$el.html(this.template());

    this.exchangeCollection.each(function(exchange) {
      var currency = exchange.get('currency');

      if(currency === 'BTC') {
        self.$el.find('.btcExchanges').append(new App.Views.ExchangeCollectionItemView({model: exchange}).render().el);
      } else if(currency === 'LTC') {
        self.$el.find('.ltcExchanges').append(new App.Views.ExchangeCollectionItemView({model: exchange}).render().el);
      }
    });

    return this;
  }
});