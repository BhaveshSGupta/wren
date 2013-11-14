$(document).ready(function() {
  // Initialize Backbone App here
  // set up model objects
  var app = new App({});
  // var server_url = 'http://127.0.0.1:5000';                // Development
  var server_url = 'http://little-wren.herokuapp.com';  // Production

  // build a view for the top level of the whole app
  var appView = new AppView({model: app});

  var getBuyValue = function() {
    $.get(server_url + '/buy-ticker', function(data) {
      // update market div
      data = data.toFixed(2);
      $('.live_data').addClass('hidden');
      $('.live_data_value').html('$'+data);
      $('.live_data').fadeIn('slow');
    });
  };

  var chartData = {};

  var loadData = function() {
    // TODO: Pull Lowest Chart Time Increment and Earliest Time from Chart Buttons
    $.get(server_url + '/data', function(returnData){
      chartData = returnData;

      var groupingUnits = [
        [
          'minute',
          [1, 5, 10, 30]
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
        width: '70%',
        credits: {
          enabled: false
        },
        rangeSelector : {
          buttons: [{
            type: 'minute',
            count: 30,
            text: '30m'
          }, {
            type: 'hour',
            count: 1,
            text: '1hr'
          }, {
            type: 'hour',
            count: 3,
            text: '3hr'
          }, {
            type: 'hour',
            count: 12,
            text: '12hr'
          }, {
            type: 'day',
            count: 1,
            text: '1d'
          }, {
            type: 'day',
            count: 3,
            text: '3d'
          }, {
            type: 'day',
            count: 7,
            text: '7d'
          }, {
            type: 'day',
            count: 30,
            text: '30d'
          }],

          inputEnabled: false,

          selected: 3
        },

        series : [{
          name : 'MtGox Bid Price',
          data : chartData.mtgox,
          color: '#d35400',
          type : 'areaspline',
          threshold : null,
          tooltip : {
            valueDecimals : 2
          },
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
          name : 'BitStamp Bid Price',
          color: '#16a085',
          data : chartData.bitstamp,
          visible: false,
          type : 'spline',
          threshold : null,
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 0
        },{
          name : 'BTC China Bid Price',
          color: '#555',
          data : chartData.btcchina,
          visible: false,
          type : 'spline',
          threshold : null,
          tooltip : {
            valueDecimals : 2
          },
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
          data : chartData.twitter.sentiment,
          dataGrouping: {
            units: groupingUnits // an array of arrays
          },
          cursor: 'pointer',
          type : 'column',
          visible: false,
          point: {
            events: {
              click: function() {
                // get grouping
                var timestamp = Math.floor(this.x / 1000);
                console.log('this.series', this.series);
                // send query to server for twitter data
                $.get(server_url + '/tweets', JSON.stringify(timestamp), function(data) {
                  // remove previous tweets
                    $('.popup ul li.temp_tweet').remove();
                  // add data to popup
                  for(var key in data){
                    var timestamp = data[key].timestamp*1000;
                    var username = data[key].username;
                    var text = data[key].text;
                    var sentiment = data[key].sentiment;
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
                  // show popup div
                  $('.popup').removeClass('hidden');
                  $('.transparent_layer').css('display', 'inline');
                  $(document).click(function() {
                    $('.popup ul').scrollTop(0);
                    $('.popup').addClass('hidden');
                    $('.transparent_layer').css('display', 'none');
                  });
                });
              }
            }
          },
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        }
        ],
        xAxis: {
          // ordinal: false
        },
        yAxis: [{ // Primary Axis
          labels: {
            format: '${value}',
            style: {
              'font-size': '1.5em'
            }
          },
          title: {
            text: 'Buy Value (USD)',
            style: {
              color: '#222',
              'font-size': '1.3em',
              'letter-spacing': '0.1em',
              'text-transform': 'uppercase'
            }
          }
        },
          {   // Secondary Axis
            opposite: true,
            labels: {
              style: {
                'font-size': '1.5em'
              }
            },
            title: {
              text: 'Sentiment',
              style: {
                color: '#222',
                'font-size': '1.3em',
                'letter-spacing': '0.1em',
                'text-transform': 'uppercase'
              }
            }
          }]
        });
    });
  };

  getBuyValue();  // update market ticker
  setInterval(getBuyValue, 60000); // update buy value every minute
  loadData();

  // Show / Hide Data
  $('input').click(function() {
    var type = $(this).attr('type');
    var name = $(this).attr('name');
    var chart = $('.chart').highcharts();
    var series = null;

    if(type === 'checkbox'){
      if(name === 'mtgox_buy') {
        series = chart.series[0];
      } else if(name === 'bitstamp_buy'){
        series = chart.series[1];
      } else if(name === 'btcchina_buy'){
        series = chart.series[2];
      } else if(name === 'twitter_sentiment'){
        series = chart.series[3];
      } else {
        alert(name + ' not implemented yet!');
        return;
      }
    }
    
    var isShown = series.visible;
    series.setVisible(!isShown, true);

  });

  // Apply the theme
  var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
});