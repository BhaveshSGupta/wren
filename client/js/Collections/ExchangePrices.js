'use strict';

var App = App || {};
App.Collections = App.Collections || {};

App.Collections.ExchangePrices = Backbone.Collection.extend({
  model: App.Models.ExchangePrice,

  initialize: function(options) {
    _(this).extend(options);

    this.url = '/prices/' + this.id;
  },

  defaults: {
    id: ''
  }
});