/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
  
  colors: ['#e67e22', '#34495e', '#2980b9', '#c0392b'],
  
  chart: {
    backgroundColor: '#eee',
    borderWidth: 0,
    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    plotBorderWidth: 0,
    plotShadow: false
  },

  credits: {
    enabled: false
  },

  global: {
    useUTC: false
  },

  inputEnabled: false,

  labels: {
    style: {
      color: '#99b'
    }
  },

  legend: {
    itemStyle: {
      color: 'black',
      font: '9pt Trebuchet MS, Verdana, sans-serif'
    },
    itemHoverStyle: {
      color: '#039'
    },
    itemHiddenStyle: {
      color: 'gray'
    }
  },
  navigation: {
    buttonOptions: {
      theme: {
        stroke: '#CCCCCC'
      }
    }
  },
  rangeSelector: {
    buttons: [{
      count: 6,
      text: '6hr',
      type: 'hour'
    }, {
      count: 12,
      text: '12hr',
      type: 'hour'
    }, {
      count: 1,
      text: '1d',
      type: 'day'
    }, {
      count: 3,
      text: '3d',
      type: 'day'
    }, {
      count: 7,
      text: '7d',
      type: 'day'
    }, {
      count: 30,
      text: '30d',
      type: 'day'
    }],
    selected: 1
  },
  subtitle: {
    floating: true,
    text: '<span style="text-transform: lowercase">vs</span> <span style="color: #2980b9;">Twitter Sentiment</span>',
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
    text: '<span style="color: #d35400;">MtGox</span> BitCoin Buy Price',
    style: {
      color: '#333',
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      'font-weight': 'bold',
      'letter-spacing': '0.1em',
      'text-transform': 'uppercase',
      'text-shadow': '0 1px 0 #fff'
    }
  },
  tooltip : {
    valueDecimals : 2,
    valuePrefix: '$',
    valueSuffix: ' USD'
  },
  xAxis: {
    gridLineWidth: 1,
    labels: {
      style: {
        color: '#000',
        font: '11px Trebuchet MS, Verdana, sans-serif'
      }
    },
    lineColor: '#000',
    tickColor: '#000',
    title: {
      style: {
        color: '#333',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    }
  },
  width: '70%'
};