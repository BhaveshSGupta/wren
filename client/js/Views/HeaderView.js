var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.HeaderView = Backbone.View.extend({
    tagName: 'header',
    className: 'topbar',

    template: window.JST.header,

    initialize: function(options) {
      this.buyTickerView = new App.Views.BuyTickerView();
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.append(this.buyTickerView.render().el);

      return this;
    }
  });
})();