'use strict';

var App = App || {};
App.Models = App.Models || {};

App.Models.Exchange = Backbone.Model.extend({
  initialize: function(options) {
    _.extend(this, options);

    this.on('change', this.setInitialVisible, this);
  },

  setInitialVisible: function() {
    if(this.get('site') === 'BTCChina') {
      this.set('visible', true);
    } else {
      this.set('visible', false);
    }
  }
});