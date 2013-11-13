$(document).ready(function() {
  // Initialize Backbone App here
  // set up model objects
  var app = new App({});
  var server_url = 'http://127.0.0.1:5000';                // Development
  // var server_url = 'http://little-wren.herokuapp.com';  // Production

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

  var loadData = function() {
    // TODO: Pull Lowest Chart Time Increment and Earliest Time from Chart Buttons
    $.get(server_url + '/data', function(returnData){
      $('.loading').fadeOut('fast');

      // Create the chart
      $('.chart').highcharts('StockChart', {
        
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

          selected : 4
        },

        series : [{
          name : 'MtGox Bid Price',
          data : returnData.mtgox,
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
            stops : [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
          },
          yAxis: 0
        },{
          name : 'BitStamp Bid Price',
          data : returnData.bitstamp,
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
          name : 'BTC China Bid Price',
          data : returnData.btcchina,
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
          name : 'Twitter Sentiment (5min)',
          data : returnData.twitter.five_min,
          cursor: 'pointer',
          point: {
            events: {
              click: function() {
                var timestamp = Math.floor(this.x / 1000);
                // send query to server for twitter data
                console.log('timestamp: ', timestamp);
                $.get(server_url + '/tweets', JSON.stringify(timestamp), function(data) {
                  // remove previous tweets
                    $('.popup ul li').remove();
                  // add data to popup
                  for(var key in data){
                    var timestamp = data[key].timestamp*1000;
                    var username = data[key].username;
                    var text = data[key].text;
                    var sentiment = data[key].sentiment;
                    $('.popup ul').append('<li> \
                                             <span class="username">' +
                                               username +
                                            '</span> \
                                               <span class="timestamp">' + ' ' + moment(timestamp).format('h:mm:ss A') + '</span><br /> \
                                             <section class="tweet">' +
                                              '<span class="text">' + text + '</span>' +
                                            '</section> \
                                             <aside class="sentiment">' + 
                                               sentiment + 
                                            '</aside> \
                                          </li>');
                    console.log(timestamp, username, text, sentiment);
                  }
                  // show popup div
                  $('.popup').removeClass('hidden');
                  $('.main').addClass('darken_background');
                  $(document).click(function() {
                    $('.popup').addClass('hidden');
                    $('.main').removeClass('darken_background');
                  });
                });
              }
            }
          },
          type : 'column',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (10min)',
          data : returnData.twitter.ten_min,
          visible: false,
          type : 'column',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (30min)',
          data : returnData.twitter.thirty_min,
          visible: false,
          type : 'column',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (1hr)',
          data : returnData.twitter.one_hour,
          visible: false,
          type : 'column',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (3hr)',
          data : returnData.twitter.three_hour,
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
          yAxis: 1
        },{
          name : 'Twitter Sentiment (6hr)',
          data : returnData.twitter.six_hour,
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
          yAxis: 1
        },{
          name : 'Twitter Sentiment (12hr)',
          data : returnData.twitter.twelve_hour,
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
          yAxis: 1
        },{
          name : 'Twitter Sentiment (1day)',
          data : returnData.twitter.one_day,
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
          yAxis: 1
        },{
          name : 'Twitter Sentiment (3day)',
          data : returnData.twitter.three_day,
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
          yAxis: 1
        }
        ],
        yAxis: [{
          labels: {
            format: '${value}',
            style: {
              'font-size': '1.5em'
            }
          },
          title: {
            text: 'USD',
            style: {
              color: '#333',
              'font-size': '2em'
            }
          }
        }, // Primary Axis
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
                color: '#333',
                'font-size': '2em'
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
      } else {
        alert(name + ' not implemented yet!');
        return;
      }
    } else if(type === 'radio'){
      // set all twitter data visible to false
      // TODO: determine which series is shown and set only that to false
      chart.series[3].setVisible(false, false);
      chart.series[4].setVisible(false, false);
      chart.series[5].setVisible(false, false);
      chart.series[6].setVisible(false, false);
      chart.series[7].setVisible(false, false);
      chart.series[8].setVisible(false, false);
      chart.series[9].setVisible(false, false);
      chart.series[10].setVisible(false, false);
      chart.series[11].setVisible(false, false);

      // set selected radio button to visible
      var value = $(this).attr('value');
      if(value === '5'){ // tweets groups by 5 mins
        series = chart.series[3];
      }else if(value === '10'){ // tweets grouped by 10 mins
        series = chart.series[4];
      }else if(value === '30'){ // tweets grouped by 30 mins
        series = chart.series[5];
      }else if(value === '60'){ // tweets grouped by 60 mins
        series = chart.series[6];
      }else if(value === '180'){ // tweets grouped by 3 hours
        series = chart.series[7];
      }else if(value === '360'){ // tweets grouped by 6 hours
        series = chart.series[8];
      }else if(value === '720'){ // tweets grouped by 12 hours
        series = chart.series[9];
      } else if(value === '1440'){ // tweets grouped by 1 day 
        series = chart.series[10];
      } else if(value === '4320'){ // tweets grouped by 3 days
        series = chart.series[11];
      } else {
        alert('Not implemented yet!');
      }

    }
    
    var isShown = series.visible;
    // TODO:need to redraw chart to fit new scale
    series.setVisible(!isShown, true);

  });

  // Apply the theme
  var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
});