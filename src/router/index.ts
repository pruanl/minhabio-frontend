import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import CategoriesView from '../views/CategoriesView.vue'
import ProductsView from '../views/ProductsView.vue'
import Bio from '../views/Bio.vue'
import Products from '../views/Products.vue'

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
        {
          path: 'categories',
          name: 'Categories',
          component: CategoriesView
        },
        {
          path: 'products',
          name: 'Products2',
          component: ProductsView
        }
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
      component: Bio
    },
    {
      path: '/p/:username',
      name: 'products',
      component: Products
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
