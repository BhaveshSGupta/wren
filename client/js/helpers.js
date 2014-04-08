var server_url;

if(window.location.hostname !== 'localhost'){
  // AWS Elastic Beanstalk Production
  server_url = 'http://default-environment-qnmrx6f75m.elasticbeanstalk.com';
} else {
  // Development
  server_url = 'http://127.0.0.1:5000';
}

// chartData global for storing data
var chartData = {};

var loadData = function() {
  $.get(server_url + '/data', function(returnData){

    chartData = JSON.parse(returnData);

    // Smooth Twitter data with Simple Moving Average
    // SMA Period: 2 days
    var sma2 = simpleMovingAverage(432); // 2 days (data arrives in 5)

    for(var i = 0; i < chartData.twitter.btc.sentiment.length; i++){
      chartData.twitter.btc.sentiment[i][1] = sma2(chartData.twitter.btc.sentiment[i][1]);
      chartData.twitter.btc.volume[i][1] = sma2(chartData.twitter.btc.volume[i][1]);
    }

    // unhide sidebar
    $('.sidebar').removeClass('hidden');

    createChart();

    // show hover window
    $('.hover_window').fadeIn('slow');

    // Hide hover popup when mouse is over the chart
    $('.chart').hover(function() {
      $('.hover_window').fadeOut('slow');
    }, function() {
      $('.hover_window').fadeIn();
    }
  );
  }).fail(function(err) {
    console.log(err);
    var $container = $('.container');
    $('.loading').addClass('hidden'); // Hide loading spinner
    $container.empty();
    $container.append('<h2>Whoops! Seems there was an error fetching the data...</h2>');

  });

};

// Add hover slide animation to the sidebar to hide/show the sidebar
var loadSidebarOptions = function(){

  $('.sidebar').hover(
    function() {
      // Slide out the sidebar
      $(this).animate(
        {'width': '150px'},
        'fast');
      $(this).css({'box-shadow': '-1px 0px 5px #aaa'});
      // Drop the OPTIONS text to the bottom of the sidebar
      $('.vertical_text').animate(
        {top: '100%',
        'margin-top': '-140%'},
        'fast');
      // Slide input boxes for toggling the data series over to be shown
      $('.toggleData').animate(
        {right: '0%'},
        'fast');
      // Remove the LEFT ARROW < to be replaced by an X while the sidebar is showing
      $('.toggleButton img').fadeOut();
      $('.button_text').fadeIn();
    },
    // To be triggered when the mouse leaves the sidebar
    function() {
      // Slide the data series back to the right
      $('.toggleData').animate({right: '-100%'}, 'fast');
      // Return the OPTIONS text to the top of the sidebar
      $('.vertical_text').animate(
        {top: '5%',
        'margin-top': ''},
        'fast');
      // Shrink the width of the sidebar
      $(this).animate(
        {'width': '40px'},
        'fast');
      $(this).css({'box-shadow': ''});
      // Fade out the X and fade in the LEFT ARROW <
      $('.button_text').fadeOut();
      $('.toggleButton img').fadeIn();
    }
  );

  // Toggle visiblity for data series
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
      } else if(name === 'btce_ltc_buy'){
        series = chart.series[3];
      } else if(name === 'twitter_btc_sentiment'){
        series = chart.series[4];
      } else if(name === 'twitter_btc_volume'){
        series = chart.series[5];
      } else {
        alert(name + ' not implemented yet!');
        return;
      }
    }

    setChartTitle();
    var isShown = series.visible;
    series.setVisible(!isShown, true); // true indicates that chart *should* be redrawn by invoking this function
  });
};

// Retrieve the latest buy price from server for MtGox
var getBuyValue = function() {
  $.get(server_url + '/buy-ticker', function(data) {
    data = JSON.parse(data).toFixed(2);
    // update market div
    $('.live_data').fadeOut('slow', function() {
      $('.live_data').addClass('hidden');
      $('.live_data_value').html('$'+data);
      $('.live_data').fadeIn('slow');
    });
  });
};