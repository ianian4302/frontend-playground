<template>
  <div class="chart-container">
    <div id="RowChartContainer" ref="RowChartContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps({
  values: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

const RowChartContainer = ref(null)

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
  const tickInterval = 2500000000 // 設置刻度間隔
  const yAxisMax = Math.ceil(Math.max(...props.values) / tickInterval) * tickInterval // 獲取比數據最大值大的最小tickInterval

  Highcharts.chart(RowChartContainer.value, {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Horizontal Bar Chart',
    },
    xAxis: {
      categories: props.categories,
      labels: {
        align: 'left', // 將標籤對齊到左側
        x: 0, // 調整 x 偏移量
        y: -15, // 調整 y 偏移量
      },
    },
    yAxis: {
      title: {
        text: 'Values',
      },
      tickInterval,
      gridLineDashStyle: 'Dash', // 將刻度線改為虛線
      max: yAxisMax, // 固定 y 軸的最大值
      minorGridLineWidth: 0, // 取消次要網格線
      lineWidth: 0, // 取消 y 軸線
      labels: {
        formatter() {
          return formatValue(this.value) // 換算 y 軸刻度的單位
        },
      },
    },
    plotOptions: {
      series: {
        groupPadding: 0.5,
        enableMouseTracking: false,
        borderRadius: 3,
        borderWidth: 0,
        pointWidth: 10,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Background',
        data: Array(props.values.length).fill(yAxisMax), // 灰色長條的數據，最大值為刻度最大值
        color: '#E5E5EF', // 灰色
        grouping: false, // 使其與其他 bar 重疊
        dataLabels: {
          enabled: true,
          formatter() {
            return formatValue(props.values[this.point.index]) // 顯示不同標籤的值並換算單位
          },
          align: 'right', // 調整標籤對齊方式
          x: 0, // 調整 x 偏移量
          y: -15, // 調整 y 偏移量
          color: '#9291A5', // 文字顏色
        },
      },
      {
        name: 'Data One',
        data: props.values,
        color: '#80B0B4',
      },
    ],
  })
})
</script>

<style scoped>
#RowChartContainer {
  width: 800px;
  height: 620px;
}
.chart-container {
  width: 50%;
  height: 600px;
}

.example-image {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}
</style>
