'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ExchangeCollectionView = Backbone.View.extend({
  tagName: 'section',
  className: 'exchanges',

  template: this.JST.exchangeCollectionView,

  initialize: function(options) {
    _(this).extend(options);
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});