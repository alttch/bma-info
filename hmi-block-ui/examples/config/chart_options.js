var eva_hmi_config_chart_options = {
  scales: {
    y: {
      ticks: {
        fontSize: 14,
        fontColor: '#999',
        userCallback: function(value, index, values) {
          if(index == 0 || index == values.length-1) return value;
        },
      },
      gridLines: {
        display: false,
        lineWidth: 2,
        tickMarkLength: 5,
        color: "#999",
      },
    },
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        unitStepSize: 1,
        round: 'minute',
        tooltipFormat: 'HH:mm'
      },
      ticks: {
        fontSize: 12,
        fontColor: '#ccc',
        maxTicksLimit: 10,
        maxRotation: 0,
        autoSkip: true,
        callback: function(value, index, values) {
            if(index == values.length-1) {
              return '';
              } else {
              return this.getLabelForValue(value).split(' ');
              }
            },

      },
      gridLines: {
        display: false,
        lineWidth: 2,
        color: "#999",
        drawOnChartArea: false,
        tickMarkLength: 10,
        borderDash: [5, 10],
      },
    },
  },
  plugins: {
    filler: {
      propagate: true
    },
    legend: { display: false }
  },
  elements: {
    line: {
      //tension: 0, // disables bezier curves
      borderWidth: 2,
    }
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  animation: {
    duration: 1000, // general animation time
  },
};
