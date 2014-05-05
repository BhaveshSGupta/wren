'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ErrorView = Backbone.View.extend({

  template: this.JST.fetchError,

  initialize: function(options) {
  },

  render: function(options) {
    if(options.error) {
      console.log(options.error);
    }

    this.$el.html(this.template());

    return this;
  }
});