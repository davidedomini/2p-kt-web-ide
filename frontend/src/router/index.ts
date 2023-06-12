import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import SigninView from '../views/SigninView.vue'
import CodeArea from '../views/CodingAreaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/code',
      name: 'code',
      component: CodeArea
    },
  ]
})

export default router
