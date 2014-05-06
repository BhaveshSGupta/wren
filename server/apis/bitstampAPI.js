'use strict';

var Bitstamp = require('bitstamp-request'),
    db       = require('../models');

// Connect to Bitstamp
var privateBitstamp = new Bitstamp(process.env.BITSTAMP_CLIENTID,
                                   process.env.BITSTAMP_KEY,
                                   process.env.BITSTAMP_SECRET);

// Scrape Bitstamp
exports.getExchangePrices = function () {
  privateBitstamp.get('https://www.bitstamp.net/api/ticker/', function(err, response){
    if(response) {
      try {
        response = JSON.parse(response.req.res.body);
      } catch(e) {
        console.log(response.req.res.body);
        console.log(e);
        return;
      }

      var thisExchangePrice = {
        site: 2, // do not hardcode this
        timestamp: response.timestamp,
        volume: response.volume,
        value: response.bid,
        currency: 1 // do not hardcode this
      };

      db.ExchangePrice.findOrCreate(thisExchangePrice)
          .success(function() {
            console.log('ExchangePrice successfully inserted! site:', thisExchangePrice.site, 'value:', thisExchangePrice.value);
          })
          .error(function(err) {
            console.error(err);
          });
    }
  });
};