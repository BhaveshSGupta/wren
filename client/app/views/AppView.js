// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function (params) {
    this.render();
  },

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

  render: function () {
    console.log(this.$el);
    this.$el.html(this.template);
  }
});
