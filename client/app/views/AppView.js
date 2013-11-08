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
    '<div id="main"> \
      <div class="logo">wren</div> \
      <div class="chart"> \
        <header>MtGox vs Twitter</header> \
        <div id="container" style="width: 800px; height: 400px;"></div> \
      </div> \
      <button class="refresh">Refresh Data</button> \
    </div>'),

  refreshData: function() {
   // TODO: Insert refresh data code here
  },

  render: function () {
    this.$el.append(this.template);
  }
});
