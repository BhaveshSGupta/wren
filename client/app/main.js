$(document).ready(function() {
  // Initialize Backbone App here
  // set up model objects
  var app = new App({});

  // build a view for the top level of the whole app
  var appView = new AppView({model: app});

  var loadData = function() {
    // TODO: Pull Lowest Chart Time Increment and Earliest Time from Chart Buttons
    var lowestInterval = 600; // 10 minutes in seconds
    var startingTime = Math.floor((Date.now()/1000)-2595599); // 30 days ago in seconds

    // $.get('http://127.0.0.1:5000/data', JSON.stringify({begin: startingTime, interval: lowestInterval}),function(returnData){
    $.get('http://little-wren.herokuapp.com/data', JSON.stringify({begin: startingTime, interval: lowestInterval}),function(returnData){

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

          selected : 2
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
          name : 'BTC China Bid Price',
          data : returnData.btcchina,
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
          yAxis: 1
        }/*{
          name : 'Twitter Sentiment',
          data : returnData.twitter,
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
          yAxis: 1
        }*/
        ],
        yAxis: [{}, // Primary Axis
          {   // Secondary Axis
            opposite: true
          }]
      });
    });
  };

  loadData();

  // Show / Hide Data
  $('input').click(function() {
    var name = $(this).attr('name');
    var chart = $('.chart').highcharts();
    var series = null;

    if(name === 'mtgox_buy') {
      series = chart.series[0];
      
    } else if(name === 'bitstamp_buy'){
      series = chart.series[1];
      isShown = series.visible;
    } else if(name === 'btcchina_buy'){
      series = chart.series[2];
    } else {
      alert(name + ' not implemented yet!');
      return;
    }

    var isShown = series.visible;

    series.setVisible(!isShown, true);

  });
  
  // Apply the theme
  var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
});