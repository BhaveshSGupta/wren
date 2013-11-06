// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function (params) {
    this.render();
  },

  events: {
    // "click button.refresh": "refreshData"
  },

  // TODO: Split out Charts from main template
  template: _.template(
    '<div id="container"> \
      <div class="logo">wren</div> \
      <div class="chart"> \
        <header>MtGox</header> \
        <canvas id="mtGox" width="400" height="400"></canvas> \
      </div> \
      <div class="chart"> \
        <header>Twitter Sentiment</header> \
        <canvas id="tweets" width="400" height="400"></canvas> \
      </div> \
      <button class="refresh">Refresh Data</button> \
    </div>'),

  refreshData: function() {
   // TODO: Insert refresh data code here
  },

  render: function () {
    this.$el.html(this.template);
  }
});
