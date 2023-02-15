import { createRouter, createWebHistory } from 'vue-router'
import CodingAreaView from '../views/CodingAreaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'codingarea',
      component: CodingAreaView
    },
  ]
})

export default router
