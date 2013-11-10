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
    '<section class="main"> \
      <header class="logo">wren</header> \
      <section class="chart"></section> \
      <aside class="toggleData"> \
        <header>Show / Hide Data: </header> \
        <section> \
          <header>MtGox</header> \
        </section \
        <section> \
          <header>BitStamp</header> \
        </section> \
        <section> \
          <header>BTC China</header> \
        </section> \
        <section> \
          <header>Twitter</header> \
        </section> \
      </aside> \
    </section>'),

  render: function () {
    this.$el.append(this.template);
  }
});
