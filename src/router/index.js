import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import linechart from '../components/LineChartComponent.vue'
import columnbar from '../components/ColumnBarChart.vue'
import RowBarChart from '../components/RowBarChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/linechart',
      name: 'linechart',
      component: linechart,
    },
    {
      path: '/columnbar',
      name: 'columnbar',
      component: columnbar,
    },
    {
      path: '/rowbarchart',
      name: 'rowbarchart',
      component: RowBarChart,
    },
  ],
})

export default router
