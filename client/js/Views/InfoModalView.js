'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.InfoModalView = Backbone.View.extend({
  tagName: 'aside',
  className: 'hoverModal hidden',

  template: this.JST.hoverModal,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});