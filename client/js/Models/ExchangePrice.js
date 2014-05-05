'use strict';

var App = App || {};
App.Models = App.Models || {};

App.Models.ExchangePrice = Backbone.Model.extend({
  initialize: function(options) {
    _.extend(this, options);

    this.set('timestamp', this.get('timestamp') * 1000); // convert to ms for HighStocks
  },

  defaults: {
    value: null,
    timestamp: null,
    site: null,
    currency: null
  }
});