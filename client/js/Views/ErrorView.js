var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.ErrorView = Backbone.View.extend({

    template: window.JST.fetchError,

    initialize: function(options) {
    },

    render: function(options) {
      if(options.error) {
        console.log(options.error);
      }

      this.$el.html(this.template());

      return this;
    }
  });
})();