import { createRouter, createWebHistory } from 'vue-router'
import Buildings from '@/views/Buildings.vue'
import BuildingDetails from '@/components/BuildingDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Buildings
  },
  {
    path: '/building/:id',
    name: 'OneBuilding',
    component: BuildingDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { routes }
export default router
