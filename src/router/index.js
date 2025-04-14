import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddPage.vue'),
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('../views/CompletedTasksView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditPage.vue'),
      props: true
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailPage.vue'),
      props: true
    }
  ],
})

export default router
