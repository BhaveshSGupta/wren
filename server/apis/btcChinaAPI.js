'use strict';

var https = require('https'),
    db    = require('../models');

var collectData = function(request, callback){
  var data = '';
  request.on('error', function(err){
    console.error('Error: ' + err.message);
  });
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

// BTC China does not have an API so collecting JSON
exports.getExchangePrices = function () {
  https.get('https://data.btcchina.com/data/ticker', function(res) {
    collectData(res, function(data) {
      try {
        data = (JSON.parse(data)).ticker;
      } catch(e) {
        console.log(e);
      }

      var thisExchangePrice = {
        site: 3, // do not hardcode this
        timestamp: Math.floor(new Date() / 1000),
        volume: parseFloat(data.vol, 10).toFixed(2),
        value: data.buy,
        currency: 2 // do not hardcode this
      };

      db.ExchangePrice.findOrCreate(thisExchangePrice)
          .success(function() {
            console.log('ExchangePrice successfully inserted! site:', thisExchangePrice.site, 'value:', thisExchangePrice.value);
          })
          .error(function(err) {
            console.error(err);
          });
    });
  }).on('error', function(e) {
    console.log('Error: ' + e.message);
  });
};