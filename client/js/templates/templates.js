this.JST = {"buyTicker": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<aside class="live_data_value"></aside><aside class="live_data_currency"><aside class="currency">USD</aside><aside class="per_unit"><span class="per">per</span>BTC</aside></aside>';

}
return __p
},
"fetchError": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Whoops! Seems there was an error fetching the data...</h2><img src="img/tumblBeast.png" alt="Fetch Error"/>';

}
return __p
},
"footer": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="icons"><a href="mailto:collenjones@gmail.com" target="_top"><img src="img/gmail.png" class="icon"/></a><a href="https://plus.google.com/share?url=http://www.bitwren.com/" target="_blank"><img src="img/google-plus.png" class="icon"/></a><a href="http://www.facebook.com/sharer/sharer.php?s=100&amp;p[url]=http://www.bitwren.com/&amp;p[images][0]=http://winpoker.com/sites/default/files/bitcoin.png&amp;p[title]=wren!&amp;p[summary]=Check+out+this+great+BitCoin+Exchange+vs+Twitter+Sentiment Analysis!" target="_blank"><img src="img/facebook.png" class="icon"/></a><script src="//platform.twitter.com/widgets.js"></script><a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20BitCoin%20performance%20vs%20sentiment%20analysis!%20@collenjones%20@HackReactor&amp;url=http%3A%2F%2Fwww.bitwren.com"><img src="img/twitter.png" class="icon"/></a><a href="http://www.hackreactor.com" target="_blank"><img src="img/hack_reactor.png" class="icon hack_reactor_logo"/></a></section>';

}
return __p
},
"hoverModal": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p><span class="bold_italic">Click</span>on<span class="twitter">blue data</span>to see Tweets.</p>';

}
return __p
},
"loadingSpinner": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img src="img/intersection.gif" class="loading"/>';

}
return __p
},
"navbar": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class="logo">WREN</span>';

}
return __p
},
"sidebar": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="toggleButton"><img src="img/left-tri16px.png"/><span class="button_text hidden">X</span></section><header class="vertical_text">Options</header><section class="toggleData"><section><header><h4>Data</h4></header><section class="exchanges"><header><h5>BTC Exchanges</h5></header><section><a href="https://vip.btcchina.com/" target="blank_"><span class="btcchina">BTC China (¥CNY<super>*</super>)</span><input name="btcchina_buy" value="buy" type="checkbox" checked="checked"/><br/></a></section><section><a href="https://www.bitstamp.net/" target="_blank"><span class="bitstamp">BitStamp ($USD)</span><input name="bitstamp_buy" value="buy" type="checkbox"/><br/></a></section><section><a href="https://www.mtgox.com/" target="_blank"><span class="mtgox">MtGox ($USD)</span><input name="mtgox_buy" value="buy" type="checkbox"/><br/></a></section><header><h5>LTC Exchanges</h5></header><section><a href="https://btc-e.com/" target="_blank"><span class="btcchina">BTC-e ($USD)</span><input name="btce_ltc_buy" value="buy" type="checkbox"/><br/></a></section></section><section class="sentiments"><header><h5>Twitter</h5></header><section><span class="twitter">Sentiment (BTC)</span><input name="twitter_btc_sentiment" value="sentiment" type="checkbox" checked="checked"/><br/></section></section></section></section>';

}
return __p
},
"twitterFeed": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="popup hidden"><ul><li>Sentiment<span class="sentiment-header">[ + / - ]</span></li></ul><section class="tweet_loading">... LOADING ...</section></section><section class="transparent_layer hidden"></section>';

}
return __p
}};