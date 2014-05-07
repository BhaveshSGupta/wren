var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.BuyTickerView = Backbone.View.extend({
    tagName: 'aside',
    className: 'live_data hidden',

    template: window.JST.buyTicker,

    initialize: function(options) {
      var self = this;

      this.model = new App.Models.ExchangePrice({url: '/buy-ticker'});
      this.model.fetch();

      // Refresh ticker every minute
      setInterval(function() {
        self.model.fetch();
      }, 60000);

      this.model.on('change', this.render, this);
    },

    render: function() {
      this.$el.html(this.template({model: this.model.toJSON()}));

      // This is a hack. gulp-jade is not rendering client-side HTML partials correctly.
      $('aside.live_data_value').html('$' + parseFloat(this.model.get('value')).toFixed(2));
      $('.live_data').show();

      return this;
    }
  });
})();