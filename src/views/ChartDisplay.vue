<template>
  <div>
    <LineChartComponent :data="lineData.default" />
    <RowBarChart :values="rowbarData.default.values" :categories="rowbarData.default.categories" />
    <ColumnBarChart :data="columnbarData.default" />
    <PieChart :data="pieData.default" />
  </div>
</template>

<script setup>
import ColumnBarChart from '../components/ColumnBarChart.vue'
import LineChartComponent from '../components/LineChartComponent.vue'
import PieChart from '../components/PieChart.vue'
import RowBarChart from '../components/RowBarChart.vue'

import * as rowbarData from '../mockdata/rowchartdata'
import * as columnbarData from '../mockdata/columnchartdata'
import * as lineData from '../mockdata/linechartdata'
import * as pieData from '../mockdata/piechartdata'
</script>
