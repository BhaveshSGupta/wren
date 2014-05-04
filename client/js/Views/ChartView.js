'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.ChartView = Backbone.View.extend({

  tagName: 'section',
  className: 'chart',

  initialize: function(options) {
    this.infoModalView = new App.Views.InfoModalView();
  },

  render: function() {
    return this;
  }
});