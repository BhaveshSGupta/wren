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
          <input name="Buy" value="buy" type="checkbox">Buy</input><br />\
          <input name="Volume" value="volume" type="checkbox">Volume</input> \
        </section> \
        <section> \
          <header>BitStamp</header> \
          <input name="Buy" value="buy" type="checkbox">Buy</input><br /> \
          <input name="Volume" value="volume" type="checkbox">Volume</input> \
        </section> \
        <section> \
          <header>BTC China</header> \
          <input name="Buy" value="buy" type="checkbox">Buy</input><br /> \
          <input name="Volume" value="volume" type="checkbox">Volume</input> \
        </section> \
        <section> \
          <header>Twitter</header> \
          <input name="Sentiment" value="sentiment" type="checkbox">Sentiment</input><br /> \
          <input name="Volume" value="volume" type="checkbox">Volume</input> \
        </section> \
      </aside> \
    </section>'),

  render: function () {
    this.$el.append(this.template);
  }
});
