import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/DemoView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
