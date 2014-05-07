this.JST = {"buyTicker": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<aside class="live_data_value"></aside><aside class="live_data_currency"><aside class="currency">USD</aside><aside class="per_unit"><span class="per">per</span>  BTC</aside></aside>';

}
return __p
},
"exchangeCollectionItemView": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="" target="blank_"><span></span><input name="" value="buy" type="checkbox"/><br/></a>';

}
return __p
},
"exchangeCollectionView": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="btcExchanges"><header><h5>BTC Exchanges</h5></header></section><section class="ltcExchanges"><header><h5>LTC Exchanges</h5></header></section>';

}
return __p
},
"fetchError": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Whoops! Seems there was an error fetching the data...</h2><div class="center tumblBeast-sprite"></div>';

}
return __p
},
"footer": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul><li><a href="mailto:collenjones@gmail.com" target="_top" class="icon gmail-sprite"></a></li><li><a href="https://plus.google.com/share?url=http://www.bitwren.com/" target="_blank" class="icon google-plus-sprite"></a></li><li><a href="http://www.facebook.com/sharer/sharer.php?s=100&amp;p[url]=http://www.bitwren.com/&amp;p[images][0]=http://winpoker.com/sites/default/files/bitcoin.png&amp;p[title]=wren!&amp;p[summary]=Check+out+this+great+BitCoin+Exchange+vs+Twitter+Sentiment Analysis!" target="_blank" class="icon facebook-sprite"></a><script src="//platform.twitter.com/widgets.js"></script></li><li><a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20BitCoin%20performance%20vs%20sentiment%20analysis!%20@collenjones%20@HackReactor&amp;url=http%3A%2F%2Fwww.bitwren.com" class="icon twitter-sprite"></a></li></ul>';

}
return __p
},
"header": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class="logo">WREN</span>';

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
"sidebar": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="toggleButton"><div class="left-arrow-sprite"></div><span class="button_text hidden">X</span></section><header class="vertical_text">Options</header><section class="toggleData"><section class="exchangeData"><header><h4>Data</h4></header><section class="sentiments"><header><h5>Twitter</h5></header><section><span class="twitter">Sentiment (BTC)</span><input name="twitter_btc_sentiment" value="sentiment" type="checkbox"/><br/></section></section></section></section>';

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