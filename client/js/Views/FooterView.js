var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.FooterView = Backbone.View.extend({
    tagName: 'footer',

    className: 'pageFooter',

    template: window.JST.footer,

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(this.template());

      return this;
    }
  });
})();