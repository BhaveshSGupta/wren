'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ExchangeCollectionItemView = Backbone.View.extend({
  tagName: 'section',

  events: {
    'click input[type="checkbox"]': 'toggleVisiblity'
  },

  template: this.JST.exchangeCollectionItemView,

  initialize: function(options) {
    _(this).extend(options);

    this.model.on('change', this.render, this);
  },

  render: function() {
    var site      = this.model.get('site'),
        url       = this.model.get('url'),
        isVisible = this.model.get('isVisible');

    // This is a hack. Jade is not rendering client-side HTML with variables correctly.
    this.$el.html(this.template());
    this.$el.find('a').attr('href', url);
    this.$el.find('span').html(site);
    this.$el.find('input').attr('name', site + '_buy');

    if(isVisible === true) {
      this.$el.find('input').attr('checked', true);
    }

    return this;
  },

  toggleVisiblity: function(e) {
    e.stopPropagation();

    this.model.toggleVisiblity();
    this.trigger('rerenderChart');
  }
});