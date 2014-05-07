var App = App || {};
App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.SentimentModalListItemView = Backbone.View.extend({
    tagName: 'li',

    template: window.JST.sentimentModalListItem,

    initialize: function(options) {
      _(this).extend(options);
      this.model = this.model || {};
    },

    render: function() {
      this.$el.html(this.template());

      // This is a hack because gulp-jade currently not compiling into client-side HTML correctly
      this.$el.find('.username').html(this.model.get('username'));
      this.$el.find('.timestamp').html(moment(this.model.get('timestamp')).format('h:mm:ss A'));
      this.$el.find('.text').html(this.model.get('text'));
      this.$el.find('.sentimentValue').html(this.model.get('sentiment'));
      return this;
    }
  });
})();