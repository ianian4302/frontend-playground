<template>
  <div class="chart-container">
    <div id="columnbar-container"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const growthRate = ref(
  props.data[0].data.map((value, index) => {
    const previousValue = props.data[1].data[index]
    const currentValue = props.data[0].data[index]
    if (previousValue === 0) {
      return 0 // Avoid division by zero
    }
    return (((currentValue - previousValue) / previousValue) * 100).toFixed(1)
  }),
)

const formatValue = (value) => {
  if (value >= 100000000) {
    return `＄${(value / 100000000).toFixed(1)}億`
  }
  if (value >= 10000000) {
    return `＄${(value / 10000000).toFixed(1)}千萬`
  }
  return `＄${value}`
}

const renderChart = () => {
  Highcharts.chart('columnbar-container', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Dynamic Column Chart',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
      labels: {
        formatter() {
          return formatValue(this.value)
        },
      },
    },
    tooltip: {
      backgroundColor: 'white',
      borderColor: 'transparent',
      style: {
        color: '#333333',
        fontSize: '14px',
        fontWeight: 'bold',
      },
      shared: true,
      headerFormat: '<b style="color: #80B0B4;">銷售金額成長率 {growthRate.value} % </b><br/>',
      pointFormat:
        '<span style="color:{series.color}; font-size: 16px;">\u25CF</span> {point.yFormatted} <br/>',
    },
    series: [
      {
        name: '2024',
        data: props.data[0].data.map((value, index) => ({
          y: value,
          yFormatted: formatValue(value),
          growthRate: growthRate.value[index],
        })),
        color: '#80B0B4',
      },
      {
        name: '2023',
        data: props.data[1].data.map((value, index) => ({
          y: value,
          yFormatted: formatValue(value),
          growthRate: growthRate.value[index],
        })),
        color: '#A6B597',
      },
    ],
    plotOptions: {
      column: {
        borderColor: '#80B0B4',
        borderWidth: 1,
        borderRadius: 4,
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
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#columnbar-container {
  width: 100%;
  height: 400px;
}

.example-image {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
