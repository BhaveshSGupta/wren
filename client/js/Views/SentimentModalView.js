'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.SentimentModalView = Backbone.View.extend({

  template: this.JST.sentimentFeed,

  initialize: function(options) {
    _(this).extend(options);
    this.sentimentCollection = this.sentimentCollection || {};

    this.sentimentModalListView = new App.Views.SentimentModalListView({sentimentCollection: this.sentimentCollection});
  },

  render: function(options) {
    var pointClicked = options.point || {};

    this.$el.html(this.template());
    this.$el.find('.modal').append(this.sentimentModalListView.render({point: pointClicked}).el);
    this.$el.show();

    return this;
  }
});