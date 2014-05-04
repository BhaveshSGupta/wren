'use strict';

var App = App || {};
App.Models = App.Models || {};

App.Models.Tweet = Backbone.Model.extend({
  initialize: function(options) {
    _.extend(this, options);
  }
});