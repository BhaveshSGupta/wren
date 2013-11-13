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
    '<section class="popup hidden"><ul></ul></section> \
    <img class="loading" src="img/bar180.gif" /> \
     <section class="main"> \
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
        <aside class="live_data hidden"> \
          <aside class="live_data_value"></aside> \
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
              <input name="mtgox_buy" value="buy" type="checkbox" checked>MtGox</input><br />\
            </section> \
            <section> \
              <input name="bitstamp_buy" value="buy" type="checkbox" checked>BitStamp</input><br /> \
            </section> \
            <section> \
              <input name="btcchina_buy" value="buy" type="checkbox" checked>BTC China</input><br /> \
            </section> \
            <section> \
              <header>Twitter Sentiment</header> \
              <input name="twitter_sentiment" value="5" type="radio" checked> 5 min</input><br /> \
              <input name="twitter_sentiment" value="10" type="radio"> 10 min</input><br /> \
              <input name="twitter_sentiment" value="30" type="radio"> 30 min</input><br /> \
              <input name="twitter_sentiment" value="60" type="radio"> 1 hr</input><br /> \
              <input name="twitter_sentiment" value="180" type="radio"> 3 hr</input><br /> \
              <input name="twitter_sentiment" value="360" type="radio"> 6 hr</input><br /> \
              <input name="twitter_sentiment" value="720" type="radio"> 12 hr</input><br /> \
              <input name="twitter_sentiment" value="1440" type="radio"> 1 day</input><br /> \
              <input name="twitter_sentiment" value="4320" type="radio"> 3 day</input><br /> \
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
