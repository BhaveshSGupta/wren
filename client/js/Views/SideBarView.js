'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SideBarView = Backbone.View.extend({
  tagName: 'aside',
  className: 'sidebar hidden',

  events: {
    'mouseenter': 'showFullSideBar',
    'mouseleave': 'hideFullSideBar'
  },

  template: this.JST.sidebar,

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  },

  showFullSideBar: function(e) {
    $(this.$el).animate(
      {'width': '150px'},
      'fast');
    $(this.$el).css({'box-shadow': '-1px 0px 5px #aaa'});
    // Drop the OPTIONS text to the bottom of the sidebar
    $('.vertical_text').animate(
      {top: '100%',
      'margin-top': '-140%'},
      'fast');
    // Slide input boxes for toggling the data series over to be shown
    $('.toggleData').animate(
      {right: '0%'},
      'fast');
    // Remove the LEFT ARROW < to be replaced by an X while the sidebar is showing
    $('.toggleButton div.left-tri16pxSprite').fadeOut();
    $('.button_text').fadeIn();
  },

  hideFullSideBar: function(e) {
    // Slide the data series back to the right
    $('.toggleData').animate({right: '-100%'}, 'fast');
    // Return the OPTIONS text to the top of the sidebar
    $('.vertical_text').animate(
      {top: '5%',
      'margin-top': ''},
      'fast');
    // Shrink the width of the sidebar
    $(this.$el).animate(
      {'width': '40px'},
      'fast');
    $(this.$el).css({'box-shadow': ''});
    // Fade out the X and fade in the LEFT ARROW <
    $('.button_text').fadeOut();
    $('.toggleButton div.left-tri16pxSprite').fadeIn();
  }
});