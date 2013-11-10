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
      <header class="topbar"> \
        <span class="logo">wren</span> \
        <navbar> \
          <li> \
            <a href="">Sentiment</a> \
          </li> \
          <li> \
            <a href="/">Markets</a> \
          </li> \
        </navbar> \
        <aside class="live_data"> \
          <aside class="live_data_value">$320.27</aside> \
          <aside class="live_data_currency"> \
            <aside class="currency"> \
              USD \
            </aside> \
            <aside class="per_unit"> \
              <span class="per">per</span> BTC \
            </aside> \
          </aside> \
        </aside> \
      </header> \
      <section class="container"> \
        <section class="chart"></section> \
        <section class="sidebar"> \
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
      </section> \
      <section class="bottom_bar"> \
        <section class="feeds"> \
          <section class="google_news feed"> \
            <header> \
              Google News \
            </header> \
          </section> \
          <section class="twitter feed"> \
            <header> \
              Twitter \
            </twitter> \
          </section> \
          <section class="reddit feed"> \
            <header> \
              Reddit \
            </header> \
          </section> \
        </section> \
      </section> \
    </section>'),

  render: function () {
    this.$el.append(this.template);
  }
});
