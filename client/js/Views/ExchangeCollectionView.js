var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.ExchangeCollectionView = Backbone.View.extend({
    tagName: 'section',
    className: 'exchanges',

    template: window.JST.exchangeCollectionView,

    initialize: function(options) {
      _(this).extend(options);

      this.exchangeListItemViews = [];

      this.exchangeCollection.on('sync', this.render, this);
    },

    render: function() {
      var self = this;

      this.$el.html(this.template());

      this.exchangeCollection.each(function(exchange) {
        var currency = exchange.get('currency');

        if(exchange.collection.length !== 0) {
          var exchangeClassName;
          if(currency === 'BTC') {
            exchangeClassName = 'btcExchanges';
          } else if(currency === 'LTC') {
            exchangeClassName = 'ltcExchanges';
          }

          var newExchange = new App.Views.ExchangeCollectionItemView({model: exchange});
          self.exchangeListItemViews.push(newExchange);

          newExchange.on('rerenderChart', function(options) {
            this.trigger('rerenderChart', options);
          }, self);

          self.$el.find('.' + exchangeClassName).append(newExchange.render().el);
        }
      });

      return this;
    }
  });
})();