'use strict';

var App = App || {};
App.Collections = App.Collections || {};

App.Collections.Exchanges = Backbone.Collection.extend({
  model: App.Models.Exchange,
  url: '/exchanges/'
});