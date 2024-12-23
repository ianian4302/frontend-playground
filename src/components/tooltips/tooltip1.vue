<template>
  <span>
    <span :style="{ color: color, fontSize: '16px' }">\u25CF</span>
    {{ point.y === 0 ? '尚無資料' : '＄' + point.y + '億' }}
  </span>
</template>

<script>
export default {
  name: 'TooltipPoint',
  props: {
    point: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
