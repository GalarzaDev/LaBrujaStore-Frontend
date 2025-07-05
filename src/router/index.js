import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store' 

import Home from '@/views/COMMON/HomeView.vue'
import Catalogo from '@/views/COMMON/CatalogView.vue'
import Login from '@/views/COMMON/LoginView.vue'
import Products from '@/views/ADMIN/ProductView.vue'
import Category from '@/views/ADMIN/CategoryView.vue'
import ProductDetail from '@/views/COMMON/ProductDetailView.vue'
import Cart from '@/views/COMMON/CartShoppingView.vue'
import Shopping from '@/views/CLIENT/ShoppingView.vue'

const routes = [
  // Rutas públicas (sin protección)
  {
    path: '/',
    name: 'Inicio',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/catalog',
    name: 'Catalogo',
    component: Catalogo,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    component: ProductDetail,
    meta: { requiresAuth: false }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: { requiresAuth: false }
  },


  {
    path: '/products',
    name: 'Productos',
    component: Products,
    meta: { requiresAuth: true }
  },



  {
    path: '/category',
    name: 'Categoria',
    component: Category,
    meta: { requiresAuth: true }
  },

    {
    path: '/shopping',
    name: 'shopping',
    component: Shopping,
    meta: { requiresAuth: true }
  },


  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      // Verificar si el usuario está autenticado
      const isAuthorized = store.state.authorize

      if (isAuthorized) {
        // Si está autorizado, mantener la lógica original o enviar a products
        if (window.history.state && window.history.state.back) {
          return window.history.state.back
        } else {
          return '/products' // Ruta por defecto para usuarios autenticados
        }
      } else {
        // Si no está autorizado, enviar al inicio
        return '/'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthorized = store.state.authorize
  const requiresAuth = to.meta.requiresAuth

  // Si la ruta requiere autenticación
  if (requiresAuth && !isAuthorized) {
    // Usuario no autorizado intentando acceder a ruta protegida
    console.log('🔴 Acceso denegado: Usuario no autorizado')
    next('/login')
    return
  }

  // Si el usuario está autorizado y trata de ir al login
  if (isAuthorized && to.name === 'Login') {
    // Redirigir a la vista principal de usuarios autenticados
    console.log('🟢 Usuario ya autenticado, redirigiendo a productos')
    next('/products')
    return
  }

  // Si el usuario está autorizado y va a la raíz (/), llevarlo a products
  if (isAuthorized && to.path === '/') {
    console.log('🟢 Usuario autorizado, redirigiendo a vista principal')
    next('/products')
    return
  }

  next()
})

export default router