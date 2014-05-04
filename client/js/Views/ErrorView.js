'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ErrorView = Backbone.View.extend({

  template: this.JST.fetchError,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});