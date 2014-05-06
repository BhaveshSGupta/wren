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

exports.getExchangePrices = function () {
  https.get('https://btc-e.com/api/2/ltc_usd/ticker', function(res) {
    collectData(res, function(data) {
      try {
        data = (JSON.parse(data)).ticker;
      } catch(e) {
        console.log(e);
      }

      var thisExchangePrice = {
        site: 4, // do not hardcode this
        /*jshint camelcase: false */
        timestamp: data.server_time,
        volume: data.vol,
        value: data.buy,
        currency: 1 // do not hardcode this
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
    console.log('Got error: ' + e.message);
  });
};