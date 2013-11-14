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
     <section class="transparent_layer"></section> \
     <img class="loading" src="img/intersection.gif" /> \
     <section class="main"> \
      <header class="topbar"> \
        <span class="logo">wren</span> \
        <navbar> \
          <li> \
            <a href="/">Disclaimer</a> \
          </li> \
          <li> \
            <a href="">Sentiment</a> \
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
            <header><h4>Options</h4></header> \
            <section> \
              <header>Exchanges</header> \
              <section> \
                <input name="mtgox_buy" value="buy" type="checkbox" checked><span class="mtgox">MtGox</span></input><br />\
              </section> \
              <section> \
                <input name="bitstamp_buy" value="buy" type="checkbox"><span class="bitstamp">BitStamp</span></input><br /> \
              </section> \
              <section> \
                <input name="btcchina_buy" value="buy" type="checkbox"><span class="btcchina">BTC China</span></input><br /> \
              </section> \
              <section> \
                <input name="twitter_sentiment" value="sentiment" type="checkbox"><span class="twitter">Twitter Sentiment</span></input><br /> \
              </section> \
            </section> \
          </aside> \
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
