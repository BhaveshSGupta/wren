var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.ExchangeCollectionItemView = Backbone.View.extend({
    tagName: 'section',

    events: {
      'click input[type="checkbox"]': 'toggleVisibility'
    },

    template: window.JST.exchangeCollectionItemView,

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

    toggleVisibility: function(e) {
      e.stopPropagation();

      this.model.toggleVisibility();
      this.trigger('rerenderChart', {name: this.model.get('site')});
    }
  });
})();