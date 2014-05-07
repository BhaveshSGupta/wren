var App = App || {};
App.Collections = App.Collections || {};

(function() {
  'use strict';

  App.Collections.Exchanges = Backbone.Collection.extend({
    model: App.Models.Exchange,
    url: '/exchanges/',

    countVisible: function() {
      var numVisible = 0;

      this.each(function(exchange) {
        if(exchange.get('isVisible') === true) {
          numVisible++;
        }
      });

      return numVisible;
    }
  });
})();