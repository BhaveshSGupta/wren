/*global Backbone */

'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.AppView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    this.navBarView = new App.Views.NavBarView();
    this.sideBarView = new App.Views.SideBarView();
    this.footerView = new App.Views.FooterView();
    this.chartView = new App.Views.ChartView();
    this.loadingSpinnerView = new App.Views.LoadingSpinnerView();

    this.render();
  },

  render: function() {
    this.$el.find('section.main').prepend(this.sideBarView.render().el);
    this.$el.find('section.main .container').append(this.loadingSpinnerView.render().el);
    this.$el.find('section.main .container').append(this.chartView.render().el);
    this.$el.find('section.main').prepend(this.navBarView.render().el);
    this.$el.find('section.main').append(this.footerView.render().el);

    // Move header up (out of window)
    $('.topbar').css({top: '-1000px'});
    $('footer.pageFooter').css({bottom: '-1000px'});
    $('.topbar').animate({top: '0px'}, 1000);
    $('footer.pageFooter').animate({bottom: '0px'}, 1000);
  }
});