$(document).ready(function() {
  // Initialize Backbone App here
  // set up model objects
  var app = new App({});

  // build a view for the top level of the whole app
  var appView = new AppView({model: app});

  // Clicking refresh button sends GET request to '/data'
  $('button.refresh').click(function() {

    // TODO: Pull Lowest Chart Time Increment and Earliest Time from Chart Buttons
    var lowestChartTimeIncrement = 1000*60*10; // 10 minutes in milliseconds
    var startingTime = Date.now() - 2592000000; // 30 days ago in milliseconds

    // $.get('http://little-wren.herokuapp.com/data', moment(timeDeltas[0]).format('YYYY-MM-DD HH:mm:ss'),function(data){
    $.get('http://127.0.0.1:5000/data', moment(startingTime).format('YYYY-MM-DD HH:mm:ss'),function(recv){
      // add data to chart
      var data = {mtgox: {bid: []}, twitter: {sentiment: []}}
      for(var i = 0; i < 24; i++){
        data.mtgox.bid.push(recv.mtgox.bid[i]);
        data.twitter.sentiment.push(recv.tweets.sentiment[i]);
      }

      console.log('mtgox:', data.mtgox.bid);
      console.log('twitter:', data.twitter.sentiment);

      // Create the chart
      $('#container').highcharts('StockChart', {
        
        
        credits: {
          enabled: false
        },

        rangeSelector : {
          buttons: [{
            type: 'minute',
            count: 10,
            text: '10m'
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

          selected : 1
        },

        title : {
          text : 'MtGox Bid Price'
        },

        series : [{
          name : 'MtGox Bid Price',
          data : data.mtgox.bid,
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
          }
        }]
      });
    });
  });
  
  // Apply the theme
  var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
});