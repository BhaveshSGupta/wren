'use strict';

var App = App || {};
App.Models = App.Models || {};

App.Models.Exchange = Backbone.Model.extend({
  initialize: function(options) {
    _.extend(this, options);

    this.on('add', this.setInitialVisibility, this);
  },

  setInitialVisibility: function() {
    if(this.get('site') === 'BTCChina') {
      this.set('isVisible', true);
    } else {
      this.set('isVisible', false);
    }
  },

  toggleVisibility: function() {
    var visibility = this.get('isVisible');

    this.set('isVisible', !visibility);
  }
});