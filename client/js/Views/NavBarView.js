'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.NavBarView = Backbone.View.extend({
  tagName: 'header',
  className: 'topbar',

  template: this.JST.navbar,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});