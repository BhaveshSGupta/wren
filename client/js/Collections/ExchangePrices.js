var App = App || {};
App.Collections = App.Collections || {};

(function() {
  'use strict';

  App.Collections.ExchangePrices = Backbone.Collection.extend({
    model: App.Models.ExchangePrice,

    initialize: function(options) {
      _(this).extend(options);

      this.data = [];
      this.url = '/prices/' + this.id;

      this.on('sync', this.createHighStocksData, this);
    },

    defaults: {
      id: ''
    },

    createHighStocksData: function() {
      // [timestamp, value] format required by HighStocks
      var self = this;

      if(this.data.length !== 0) {
        this.data = [];
      }

      this.each(function(exchangePrice) {
        self.data.push([exchangePrice.get('timestamp'), exchangePrice.get('value')]);
      });
    }

  });
})();
