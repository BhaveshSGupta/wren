'use strict';

var App = App || {};
App.Collections = App.Collections || {};


App.Collections.ExchangePrices = Backbone.Collection.extend({
  model: App.Models.ExchangePrice,
  url: '/prices/'
});