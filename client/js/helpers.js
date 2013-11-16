var server_url;
// if (process.env.IS_PRODUCTION){
//   server_url = 'http://little-wren.herokuapp.com';  // Production
// } else {
//   server_url = 'http://127.0.0.1:5000';             // Development
// }

// server_url = 'http://default-environment-qnmrx6f75m.elasticbeanstalk.com';     // AWS Elastic Beanstalk Production
// server_url = 'http://little-wren.herokuapp.com';     // Heroku Production
server_url = 'http://127.0.0.1:5000';                   // Development

var setChartTitle = function(){
  var seriesArray = [];
  var inputBoxes = $('input');
  var first_title = '';
  var second_title = '';
  inputBoxes.each(function(index, item){
    if(item.checked){
      if(item.name === 'mtgox_buy'){
        // title += '<span style="color: #d35400;">MtGox</span> ';
        seriesArray.push('<span style="color: #d35400;">MtGox</span>');
      } else if(item.name === 'bitstamp_buy'){
        // title += '<span style="color: #16a085;">BitStamp</span> ';
        seriesArray.push('<span style="color: #16a085;">BitStamp</span>');
      } else if(item.name === 'btcchina_buy'){
        // title += '<span style="color: #555;">BTC China</span> ';
        seriesArray.push('<span style="color: #555;">BTC China</span>');
      } else if(item.name === 'twitter_sentiment'){
        // title += 'vs <span style="color: #2980b9;">Twitter Sentiment</span>';
        second_title += '<span style="color: #2980b9;">Twitter Sentiment</span>';
      } else {
        console.log('FAIL: Tried to set title for input box that has not been handled yet.');
      }
    }
  });

  if(seriesArray.length){
    first_title = seriesArray.join(', ') + ' BitCoin Buy Price';
    console.log(first_title);
    if(second_title.length){
      second_title = '<span style="text-transform: lowercase">vs</span> ' + second_title;
    }
  } else if(second_title.length){
    first_title = second_title;
    second_title = '';
  }

  $('.chart').highcharts().setTitle({text: first_title}, {text: second_title});
};

// chartData global for storing data
var chartData = {};

var loadData = function() {
  // TODO: Pull Lowest Chart Time Increment and Earliest Time from Chart Buttons
  $.get(server_url + '/data', function(returnData){
    chartData = returnData;

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

    // unhide sidebar
    $('.sidebar').removeClass('hidden');

    // Create the chart
    $('.chart').highcharts('StockChart', {
      series : [{
        name : 'MtGox Bid Price',
        data : chartData.mtgox,
        color: '#d35400',
        type : 'areaspline',
        threshold : null,
        tooltip : {
          valueDecimals : 2,
          valuePrefix: '$'
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
        yAxis: 0
      },{
        name : 'BTC China Bid Price',
        color: '#555',
        data : chartData.btcchina,
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
        data : chartData.twitter.sentiment,
        dataGrouping: {
          units: groupingUnits // an array of arrays
        },
        cursor: 'pointer',
        type : 'column',
        visible: true,
        tooltip: {
          valuePrefix: null,
          valueSuffix: '<br/>(<b>click column to see tweets</b>)'
        },
        point: {
          events: {
            click: function() {
              // get grouping
              var begin = Math.floor(this.x / 1000);
              var interval = this.series.currentDataGrouping.unitRange / 100;

              console.log('begin: ', this.x/1000, 'end: ', (this.x / 1000) + (this.series.currentDataGrouping.unitRange/100));
              console.log('data grouping: ', this.series.currentDataGrouping.unitRange);
              // send query to server for twitter data
              $.get(server_url + '/tweets', JSON.stringify({begin: begin, end: begin+interval}), function(data) {
                // remove previous tweets
                  
                  $('.popup ul li.temp_tweet').remove();
                  var sentiment_total = 0;
                // add data to popup
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
                console.log('sentiment_total: ', sentiment_total);
                // show popup div
                $('.popup, .transparent_layer').removeClass('hidden');
                // $('.transparent_layer').removeClass('hidden');
                $(document).click(function() {
                  $('.popup ul').scrollTop(0);
                  $('.popup').addClass('hidden');
                  $('.transparent_layer').addClass('hidden');
                });
              });
            }
          }
        },
        yAxis: 1
      }
      ]
    });
  });
};

var loadSidebarOptions = function(){
  // Show / Hide Chart Options
  $('.sidebar').hover(
    function() {
      $(this).animate(
        {'width': '150px'
       }, 'fast');
      $(this).css({'box-shadow': '-1px 0px 5px #aaa'});
      $('.vertical_text').animate(
        {top: '100%',
        'margin-top': '-140%'
      }, 'fast');
      $('.toggleData').animate(
        {right: '0%'
      }, 'fast');
      $('.toggleButton img').fadeOut();
      $('.button_text').fadeIn();
    }, function() {
      $('.toggleData').animate({right: '-100%'}, 'fast');
      $('.vertical_text').animate(
        {top: '5%',
        'margin-top': ''
      }, 'fast');
      $(this).animate(
        {'width': '40px'
       }, 'fast');
      $(this).css({'box-shadow': ''});
      $('.button_text').fadeOut();
      $('.toggleButton img').fadeIn();
    }
  );
  
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
    
    setChartTitle();
    var isShown = series.visible;
    series.setVisible(!isShown, true);
  });
};

var getBuyValue = function() {
  $.get(server_url + '/buy-ticker', function(data) {
    // update market div
    data = data.toFixed(2);
    $('.live_data').addClass('hidden');
    $('.live_data_value').html('$'+data);
    $('.live_data').fadeIn('slow');
  });
};