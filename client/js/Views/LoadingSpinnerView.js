'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.LoadingSpinnerView = Backbone.View.extend({

  template: JST.loadingSpinner,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});