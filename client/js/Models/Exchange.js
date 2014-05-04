'use strict';

var App = App || {};
App.Models = App.Models || {};

App.Models.Exchanges = Backbone.Model.extend({
  initialize: function(options) {
    _.extend(this, options);
  }
});