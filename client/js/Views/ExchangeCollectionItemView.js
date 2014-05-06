'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ExchangeCollectionItemView = Backbone.View.extend({
  tagName: 'section',

  template: this.JST.exchangeCollectionItemView,

  initialize: function(options) {
    _(this).extend(options);
  },

  render: function() {
    var site = this.model.get('site'),
        url  = this.model.get('url');

    // This is a hack. Jade is not rendering client-side HTML with variables correctly.
    this.$el.html(this.template());
    this.$el.find('a').attr('href', url);
    this.$el.find('span').html(site);
    this.$el.find('input').attr('name', site + '_buy');

    return this;
  }
});