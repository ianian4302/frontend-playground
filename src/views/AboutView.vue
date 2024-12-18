<template>
  <!-- component -->
  <!-- https://dribbble.com/shots/14959823-Dashboard-UI-Elements -->
  <div className="h-screen bg-gray-100 p-6">
    <!-- { /*variation dark set*/ } -->

    <!-- { /*variation dark set*/ } -->
    <div
      class="mx-auto flex justify-start overflow-x-scroll rounded-lg bg-white px-2 py-4 shadow-md md:mx-12 md:justify-center"
    >
      <div
        v-for="(day, index) in days"
        :key="index"
        :class="[
          'mx-1 flex w-16 cursor-pointer justify-center rounded-lg transition-all duration-300',
          selectedDayDark === index
            ? 'group relative bg-purple-600 shadow-lg'
            : 'hover:bg-purple-500 hover:shadow-lg',
        ]"
        @click="selectDayDark(index)"
      >
        <span v-if="selectedDayDark === index" class="absolute -right-1 -top-1 flex size-3">
          <span
            class="absolute inline-flex size-full animate-ping rounded-full bg-purple-400 opacity-0 group-hover:opacity-75"
          ></span>
          <span class="relative inline-flex size-3 rounded-full bg-purple-100"></span>
        </span>
        <div class="flex items-center p-4">
          <div class="text-center">
            <p
              :class="[
                'text-sm transition-all duration-300',
                selectedDayDark === index
                  ? 'text-gray-100'
                  : 'text-gray-900 group-hover:text-gray-100',
              ]"
            >
              {{ day.name }}
            </p>
            <p
              :class="[
                'mt-3 transition-all duration-300',
                selectedDayDark === index
                  ? 'font-bold text-gray-100'
                  : 'text-gray-900 group-hover:font-bold group-hover:text-gray-100',
              ]"
            >
              {{ day.date }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <br /><br />

    <!-- { /*variation light set*/ } -->
    <div
      class="mx-auto flex justify-start overflow-x-scroll rounded-lg bg-white px-2 py-4 shadow-md md:mx-12 md:justify-center"
    >
      <div
        v-for="(day, index) in days"
        :key="index"
        :class="[
          'group mx-1 flex w-16 cursor-pointer justify-center rounded-lg transition-all duration-300',
          selectedDayLight === index
            ? 'relative bg-purple-300 shadow-lg'
            : 'hover:bg-purple-100 hover:shadow-lg',
        ]"
        @click="selectDayLight(index)"
      >
        <span v-if="selectedDayLight === index" class="absolute -right-1 -top-1 flex size-3">
          <span
            class="absolute inline-flex size-full animate-ping rounded-full bg-purple-400 opacity-0 group-hover:opacity-75"
          ></span>
          <span class="relative inline-flex size-3 rounded-full bg-purple-500"></span>
        </span>
        <div class="flex items-center p-4">
          <div class="text-center">
            <p
              :class="[
                'text-sm transition-all duration-300',
                selectedDayLight === index
                  ? 'text-purple-900'
                  : 'text-gray-900 group-hover:text-purple-900',
              ]"
            >
              {{ day.name }}
            </p>
            <p
              :class="[
                'mt-3 transition-all duration-300',
                selectedDayLight === index
                  ? 'font-bold text-purple-900'
                  : 'text-gray-900 group-hover:font-bold group-hover:text-purple-900',
              ]"
            >
              {{ day.date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDayDark: null,
      selectedDayLight: null,
      days: [],
    }
  },
  created() {
    // 獲取當前日期
    const today = new Date()
    const currentDay = today.getDay() // 0-6 (週日-週六)

    // 設置默認選中今天
    this.selectedDayDark = currentDay
    this.selectedDayLight = currentDay

    // 計算本週的第一天 (週日)
    const firstDay = new Date(today)
    firstDay.setDate(today.getDate() - currentDay)

    // 生成這週的日期數組
    this.days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDay)
      date.setDate(firstDay.getDate() + i)

      return {
        name: this.getDayName(date.getDay()),
        date: date.getDate().toString(),
        fullDate: date, // 保存完整日期以供將來使用
      }
    })
  },
  methods: {
    getDayName(dayIndex) {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return dayNames[dayIndex]
    },
    selectDayDark(index) {
      this.selectedDayDark = index
    },
    selectDayLight(index) {
      this.selectedDayLight = index
    },
  },
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
