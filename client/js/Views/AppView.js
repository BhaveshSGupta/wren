/*global Backbone */

'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.AppView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    this.navBarView = new App.Views.NavBarView();
    this.footerView = new App.Views.FooterView();

    this.render();
  },

  render: function() {
    $('body section.main').prepend(this.navBarView.render().el);
    // $('body').append(this.footerView.render().el);

    // Move header up (out of window)
    $('header.topbar').css({top: '-1000px'});
    $('header.topbar').animate({top: '0px'}, 1000);
  }
});