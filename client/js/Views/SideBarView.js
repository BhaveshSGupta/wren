'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SideBarView = Backbone.View.extend({
  tagName: 'aside',
  className: 'sidebar hidden',

  events: {
    'mouseenter': 'showFullSideBar',
    'mouseleave': 'hideFullSideBar',
    'click input': 'toggleVisibility'
  },

  template: this.JST.sidebar,

  initialize: function(options) {
    _(this).extend(options);

    this.exchangeCollectionView = new App.Views.ExchangeCollectionView({exchangeCollection: this.exchangeCollection, tweetCollection: this.tweetCollection});

    this.exchangeCollectionView.on('rerenderChart', function(options) {
      this.trigger('rerenderChart', options);
    }, this);
  },

  render: function() {
    this.$el.html(this.template());
    this.$el.find('section.sentiments section input').attr('checked', this.tweetCollection.get('visible'));
    this.$el.find('.exchangeData').append(this.exchangeCollectionView.render().el);

    if(this.tweetCollection.isVisible === true) {
      this.$el.find('input').attr('checked', true);
    }

    return this;
  },

  toggleVisibility: function(e) {
    e.stopPropagation();
    var visibility = this.tweetCollection.isVisible;

    this.tweetCollection.isVisible = !visibility;
    this.trigger('rerenderChart', {name: 'Twitter'});
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
    $('.toggleButton div.left-arrow-sprite').fadeOut();
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
    $('.toggleButton div.left-arrow-sprite').fadeIn();
  }
});