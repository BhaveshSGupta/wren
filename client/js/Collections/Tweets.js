'use strict';

var App = App || {};
App.Collections = App.Collections || {};

App.Collections.Tweets = Backbone.Collection.extend({
  model: App.Models.Tweet,
  url: '/tweets/'
});