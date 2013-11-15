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
    '<section class="popup hidden"> \
       <ul> \
         <header> \
           <li>Header</li> \
         </header> \
       </ul> \
     </section> \
     <section class="transparent_layer hidden"></section> \
     <img class="loading" src="img/intersection.gif" /> \
     <section class="main"> \
      <header class="topbar"> \
        <span class="logo">wren</span> \
        <navbar> \
           <li> \
            <a href="">Sentiment?</a> \
          </li> \
          <li> \
            <a href="/">Disclaimer</a> \
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
          <section class="toggleButton"></section> \
          <header class="vertical_text">Options</header> \
          <section class="toggleData"> \
            <section> \
              <header><h4>Data</h4></header> \
              <section> \
                <span class="mtgox">MtGox</span><input name="mtgox_buy" value="buy" type="checkbox" checked></input><br />\
              </section> \
              <section> \
                <span class="bitstamp">BitStamp</span><input name="bitstamp_buy" value="buy" type="checkbox"></input><br /> \
              </section> \
              <section> \
                <span class="btcchina">BTC China</span><input name="btcchina_buy" value="buy" type="checkbox"></input><br /> \
              </section> \
              <section> \
                <span class="twitter">Twitter Sentiment</span><input name="twitter_sentiment" value="sentiment" type="checkbox"></input><br /> \
              </section> \
            </section> \
          </section> \
        </section> \
      </section> \
      <section class="bottom_bar"> \
        <section class="icons"> \
          <img class="icon" src="img/bitcoin.png" /> \
          <img class="icon" src="img/google-plus.png" /> \
          <img class="icon" src="img/facebook.png" /> \
          <img class="icon" src="img/twitter.png" /> \
          <a href="http://www.hackreactor.com" target="_blank"><img class="icon hack_reactor_logo" src="img/hack_reactor.png" /></a> \
        </section> \
      </section> \
    </section>'),

  render: function () {
    this.$el.append(this.template);
  }
});
