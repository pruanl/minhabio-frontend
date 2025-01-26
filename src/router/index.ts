import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import BioView from '../views/BioView.vue'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthenticatedLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/b/:username',
      name: 'bio',
      component: BioView
    },
    {
      path: '/p/:username',
      name: 'products',
      component: ProductsView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})


export default router
