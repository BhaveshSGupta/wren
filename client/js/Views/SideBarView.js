'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SideBarView = Backbone.View.extend({
  tagName: 'aside',
  className: 'sidebar hidden',

  template: this.JST.sidebar,

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});