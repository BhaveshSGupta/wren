var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.InfoModalView = Backbone.View.extend({
    tagName: 'aside',
    className: 'hoverModal hidden',

    template: window.JST.hoverModal,

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(this.template());

      return this;
    }
  });
})();