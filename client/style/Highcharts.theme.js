/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
  width: '70%',
  tooltip : {
    valueDecimals : 2,
    valuePrefix: '$',
    valueSuffix: ' USD'
  },
  title: {
    floating: true,
    text: '<span style="color: #d35400;">MtGox</span> BitCoin Buy Price',
    style: {
      color: '#333',
      'font-weight': 'bold',
      'letter-spacing': '0.1em',
      'text-transform': 'uppercase',
      'text-shadow': '0 1px 0 #fff'
    }
  },
  subtitle: {
    floating: true,
    text: '<span style="text-transform: lowercase">vs</span> <span style="color: #2980b9;">Twitter Sentiment</span>',
    style: {
      color: '#333',
      'font-size': '1.2em',
      'font-weight': 'bold',
      'letter-spacing': '0.1em',
      'text-transform': 'uppercase',
      'text-shadow': '0 1px 0 #fff'
    }
  },
  credits: {
    enabled: false
  },
  rangeSelector : {
    buttons: [{
      type: 'hour',
      count: 6,
      text: '6hr'
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

    selected: 1
  },
  yAxis: [{ // Primary Axis
    labels: {
      format: '${value}',
      style: {
        'font-size': '1.5em'
      }
    },
    title: {
      text: 'Buy Price ($USD)',
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
  }],
  global: {
          useUTC: false
        },
   colors: ['#e67e22', '#34495e', '#2980b9', '#c0392b'],
   chart: {
      backgroundColor: '#eee',
      borderWidth: 0,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: false,
      plotBorderWidth: 0
   },
   title: {
      style: {
         color: '#000',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   xAxis: {
      gridLineWidth: 1,
      lineColor: '#000',
      tickColor: '#000',
      labels: {
         style: {
            color: '#000',
            font: '11px Trebuchet MS, Verdana, sans-serif'
         }
      },
      title: {
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

         }
      }
   },
   yAxis: {
      minorTickInterval: 'auto',
      lineColor: '#000',
      lineWidth: 1,
      tickWidth: 1,
      tickColor: '#000',
      labels: {
         style: {
            color: '#000',
            font: '11px Trebuchet MS, Verdana, sans-serif'
         }
      },
      title: {
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
         }
      }
   },
   legend: {
      itemStyle: {
         font: '9pt Trebuchet MS, Verdana, sans-serif',
         color: 'black'

      },
      itemHoverStyle: {
         color: '#039'
      },
      itemHiddenStyle: {
         color: 'gray'
      }
   },
   labels: {
      style: {
         color: '#99b'
      }
   },

   navigation: {
      buttonOptions: {
         theme: {
            stroke: '#CCCCCC'
         }
      }
   }
};