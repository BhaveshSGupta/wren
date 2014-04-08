var createChart = function() {
  var groupingUnits = [
    [
      'minute',
      [5, 10, 30]
    ], [
      'hour',
      [1, 3, 6, 12]
    ], [
      'day',
      [1, 3, 7]
    ]
  ];

  // Create the chart
  $('.chart').highcharts('StockChart', {
    series : [{
      name : 'MtGox (BTC) Bid Price',
      data : chartData.mtgox.btc,
      visible: false,
      color: '#555',
      type : 'spline',
      threshold : null,
      fillColor : {
        linearGradient : {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops : [[0, '#e67e22'], [1, 'rgba(0,0,0,0)']]
      },
      yAxis: 0
    },{
      name : 'BitStamp (BTC) Bid Price',
      color: '#16a085',
      data : chartData.bitstamp.btc,
      visible: false,
      type : 'spline',
      threshold : null,
      yAxis: 0
    },{
      name : 'BTC China (BTC) Bid Price',
      color: '#d35400',
      data : chartData.btcchina.btc,
      visible: true,
      type : 'areaspline',
      threshold : null,
      fillColor : {
        linearGradient : {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops : [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
      },
      yAxis: 0
    },{
      name : 'BTC-e (LTC) Bid Price',
      color: '#555',
      data : chartData.btce.ltc,
      visible: false,
      type : 'spline',
      threshold : null,
      fillColor : {
        linearGradient : {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops : [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
      },
      yAxis: 0
    },{
      name : 'Twitter Sentiment',
      color: '#2980b9',
      data : chartData.twitter.btc.sentiment,
      dataGrouping: {
        units: groupingUnits
      },
      cursor: 'pointer',
      type : 'spline',
      visible: true,
      tooltip: {
        valuePrefix: null,
        valueSuffix: null
      },
      point: {
        events: {
          // Click on a Twitter Sentiment point to show the individual tweets
          click: function() {
            // get grouping
            var begin = Math.floor(this.x / 1000);
            var interval = this.series.currentDataGrouping.unitRange / 100;

            // show popup div
            $('.popup, .transparent_layer').removeClass('hidden');

            // fadeIn() fadeOut() loop for LOADING
            $('.popup .tweet_loading').fadeIn(1000);

            // Add ability to click to close window
            $(document).click(function() {
              $('.popup').addClass('hidden');
              $('.transparent_layer').addClass('hidden');
              // Remove tweets
              $('.popup ul li.temp_tweet').remove();
            });

            // Send query to server for twitter data
            $.get(server_url + '/tweets', JSON.stringify({begin: begin, end: begin+interval}), function(data) {
              data = JSON.parse(data);
              var sentiment_total = 0;

              // Remove loading symbol
              $('.popup .tweet_loading').css({display: 'none'});

              // Add data to popup
              for(var key in data){
                var timestamp = data[key].timestamp*1000;
                var username = data[key].username;
                var text = data[key].text;
                var sentiment = data[key].sentiment;
                sentiment_total += sentiment;
                $('.popup ul').append('<li class="temp_tweet"> \
                                         <section class="tweet">' +
                                         '<span class="username">' +
                                            username +
                                         '</span> \
                                          <span class="timestamp">' + ' ' + moment(timestamp).format('h:mm:ss A') + '</span><br /> \
                                          <span class="text">' + text + '</span>' +
                                        '</section> \
                                         <aside class="sentiment">' +
                                           sentiment +
                                        '</aside> \
                                      </li>');
              }
            });
          }
        }
      },
      yAxis: 1
    }/*,{
      name : 'Twitter Volume',
      color: '#2980b9',
      data : chartData.twitter.btc.volume,
      dataGrouping: {
        units: groupingUnits
      },
      cursor: 'pointer',
      type : 'spline',
      visible: false,
      tooltip: {
        valuePrefix: null,
        valueSuffix: null
      },
      yAxis: 1
    }*/
    ],
    subtitle: {
      floating: true,
      text: '<span style="text-transform: lowercase">vs</span> <span style="color: #2980b9;">Twitter Sentiment (BTC)</span>',
      style: {
        color: '#333',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
        'font-size': '1.2em',
        'font-weight': 'bold',
        'letter-spacing': '0.1em',
        'text-transform': 'uppercase',
        'text-shadow': '0 1px 0 #fff'
      }
    },
    title: {
      floating: true,
      text: '<span style="color: #d35400;">BTC China (BTC)</span> Buy Price',
      style: {
        color: '#333',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
        'font-weight': 'bold',
        'letter-spacing': '0.1em',
        'text-transform': 'uppercase',
        'text-shadow': '0 1px 0 #fff'
      }
    },
    yAxis: [{ // Primary Axis
      labels: {
        format: '${value}',
        style: {
          color: '#333',
          'font-size': '1.5em'
        }
      },
      lineColor: '#000',
      lineWidth: 1,
      minorTickInterval: 'auto',
      tickColor: '#000',
      tickWidth: 1,
      title: {
        text: 'Buy Price ($USD)',
        style: {
          color: '#222',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif',
          'font-size': '1.3em',
          'font-weight': 'normal',
          'letter-spacing': '0.1em',
          'text-transform': 'uppercase'
        }
      }
    },
    {   // Secondary Axis
      labels: {
        style: {
          color: '#333',
          'font-size': '1.5em'
        }
      },
      lineColor: '#000',
      lineWidth: 1,
      minorTickInterval: 'auto',
      opposite: true,
      tickWidth: 1,
      tickColor: '#000',
      title: {
        text: 'Sentiment',
        style: {
          color: '#222',
          font: '11px Trebuchet MS, Verdana, sans-serif',
          'font-size': '1.3em',
          'font-weight': 'normal',
          'letter-spacing': '0.1em',
          'text-transform': 'uppercase'
        }
      }
    }]
  });
};

// Dynamically change the chart title to show which data series are shown with their respective colors
var setChartTitle = function(){
  var seriesArray = [];
  var inputBoxes = $('input');
  var first_title = '';
  var second_title = '';
  inputBoxes.each(function(index, item){
    if(item.checked){
      if(item.name === 'mtgox_buy'){
        seriesArray.push('<span style="color: #555;">MtGox (BTC)</span>');
      } else if(item.name === 'bitstamp_buy'){
        seriesArray.push('<span style="color: #16a085;">BitStamp (BTC)</span>');
      } else if(item.name === 'btcchina_buy'){
        seriesArray.push('<span style="color: #d35400;">BTC China (BTC)</span>');
      } else if(item.name === 'btce_ltc_buy'){
        seriesArray.push('<span style="color: #555;">BTC-e (LTC)</span>');
      } else if(item.name === 'twitter_btc_sentiment'){
        second_title += '<span style="color: #2980b9;">Twitter Sentiment(BTC)</span>';
      } else {
        console.log('FAIL: Tried to set title for input box that has not been handled yet.');
      }
    }
  });

  if(seriesArray.length){
    first_title = seriesArray.join(', ') + ' Buy Price';
    if(second_title.length){
      second_title = '<span style="text-transform: lowercase">vs</span> ' + second_title;
    }
  } else if(second_title.length){
    first_title = second_title;
    second_title = '';
  }

  $('.chart').highcharts().setTitle({text: first_title}, {text: second_title});
};