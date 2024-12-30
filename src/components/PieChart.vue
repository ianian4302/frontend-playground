<template>
  <div class="chart-container">
    <div ref="PieChartContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import Highcharts from 'highcharts'

const colorPalette = ['#80B0B4', '#90A4B5', '#A4C2F4', '#B5EAD7', '#FFDAC1', '#FF9AA2']
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const PieChartContainer = ref(null)

const formatValue = (value) => {
  if (value >= 100000000) {
    return `＄${(value / 100000000).toFixed(1)}億`
  }
  if (value >= 10000000) {
    return `＄${(value / 10000000).toFixed(1)}千萬`
  }
  return `＄${value}`
}

onMounted(() => {
  Highcharts.chart(PieChartContainer.value, {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Sample Pie Chart',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          formatter() {
            const percentage = (this.y / this.series.yData.reduce((a, b) => a + b, 0)) * 100
            return `<b style="color:${this.point.color}">${this.point.name}</b><br/> <span style="color:${this.point.color}; font-size: 20px;">\u25CF</span > ${formatValue(this.point.y)} <b style="color:${this.point.color}">${percentage.toFixed(1)}%</b>`
          },
          softConnector: false,
          shadow: true,
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          padding: 8,
          style: {
            fontSize: '16px', // 調整 point name 字體大小
            color: '#5A5A5A',
          },
        },
        borderWidth: 0,
      },
    },
    series: [
      {
        colorByPoint: true,
        data: props.data.map((item) => ({
          name: item.name,
          y: item.value,
        })),
        colors: colorPalette,
      },
    ],
  })
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 700px;
}
</style>
