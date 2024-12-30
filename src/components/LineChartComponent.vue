<template>
  <div class="chart-container">
    <div id="linechart-container"></div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const renderChart = () => {
  const data = props.data[0].values
  const max = Math.max(...data) + 10
  const min = Math.min(...data) - 10

  Highcharts.chart('linechart-container', {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Dynamic Line Chart',
    },
    yAxis: {
      title: {
        text: 'Values',
      },
      max,
      min,
    },
    tooltip: {
      backgroundColor: 'white',
      borderColor: 'transparent',
      headerFormat: '<b style="color: #80B0B4;">金額總覽</b><br/>',
      pointFormat: '＄{point.y}億',
    },
    series: [
      {
        name: 'Data',
        data: props.data[0].values,
        lineWidth: 2,
        color: '#80B0B4', // Change line color
        marker: {
          enabled: true, // Always display markers
          fillColor: '#80B0B4', // Change marker fill color
          lineColor: '#80B0B4', // Change marker line color
        },
        states: {
          hover: {
            lineWidth: 3,
            color: '#80B0B4', // Change hover state color
          },
        },
        enableMouseTracking: true,
      },
      {
        name: 'Data',
        data: props.data[1].values,
        lineWidth: 2,
        color: '#80B0B4', // Change line color
        marker: {
          enabled: true, // Always display markers
          fillColor: '#80B0B4', // Change marker fill color
          lineColor: '#80B0B4', // Change marker line color
        },
        states: {
          hover: {
            lineWidth: 3,
            color: '#80B0B4', // Change hover state color
          },
        },
        enableMouseTracking: true,
      },
    ],
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#80B0B4',
          lineWidth: 2,
          enabled: true, // Always display markers
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 2,
            color: '#80B0B4', // Change hover state color
          },
        },
        enableMouseTracking: true,
        turboThreshold: 0,
        curve: props.curve,
      },
    },
  })
}

watch(() => props.data, renderChart)

onMounted(renderChart)
</script>

<style scoped>
.chart-container {
  width: 110%;
  max-width: 1000px; /* Limit the chart's range */
  margin: 0 auto; /* Center the chart */
}

#linechart-container {
  width: 100%;
  height: 400px;
}

.example-image {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}
</style>
