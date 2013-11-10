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
      <section class="chart"> \
        <a href="#">Exchanges</a> \
        <a href="#">Sentiment</a> \
      </section> \
      <section class="sidebar"> \
        <aside class="live_data"> \
          <header><h2>$320 USD / BTC</h2></header> \
        </aside> \
        <aside class="toggleData"> \
          <header><h4>Show / Hide Data: </h4></header> \
          <section> \
            <header>MtGox</header> \
            <input name="mtgox_buy" value="buy" type="checkbox" checked="checked">Buy</input><br />\
            <input name="mtgox_vol" value="volume" type="checkbox">Volume</input> \
          </section> \
          <section> \
            <header>BitStamp</header> \
            <input name="bitstamp_buy" value="buy" type="checkbox" checked="checked">Buy</input><br /> \
            <input name="bitstamp_vol" value="volume" type="checkbox">Volume</input> \
          </section> \
          <section> \
            <header>BTC China</header> \
            <input name="btcchina_buy" value="buy" type="checkbox" checked="checked">Buy</input><br /> \
            <input name="btcchina_vol" value="volume" type="checkbox">Volume</input> \
          </section> \
          <section> \
            <header>Twitter</header> \
            <input name="twitter_sentiment" value="sentiment" type="checkbox">Sentiment</input><br /> \
            <input name="twitter_volume" value="volume" type="checkbox">Volume</input> \
          </section> \
        </aside> \
      </section> \
    </section>'),

  render: function () {
    this.$el.append(this.template);
  }
});
