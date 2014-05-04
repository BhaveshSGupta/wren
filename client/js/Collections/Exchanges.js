'use strict';

var App = App || {};
App.Collections = App.Collections || {};

App.Collections.Exchange = Backbone.Collection.extend({
  model: App.Models.Exchange,
  url: '/exchanges/'
});