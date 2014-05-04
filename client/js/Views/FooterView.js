'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.FooterView = Backbone.View.extend({
  tagName: 'footer',

  className: 'pageFooter',

  template: this.JST.footer,

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});