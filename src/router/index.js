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

  // Rutas protegidas - ADMINISTRADOR
  {
    path: '/products',
    name: 'Productos',
    component: Products,
    meta: { requiresAuth: true, allowedRoles: ['ADMINISTRADOR'] }
  },
  {
    path: '/category',
    name: 'Categoria',
    component: Category,
    meta: { requiresAuth: true, allowedRoles: ['ADMINISTRADOR'] }
  },

  // Rutas protegidas - CLIENTE
  {
    path: '/shopping',
    name: 'shopping',
    component: Shopping,
    meta: { requiresAuth: true, allowedRoles: ['CLIENTE'] }
  },

  // Ruta catch-all para manejar 404
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const isAuthorized = store.state.authorize
      const userRole = store.state.user?.role || store.state.role // Ajusta según tu estructura de store

      if (isAuthorized) {
        // Redirigir según el rol del usuario
        if (userRole === 'CLIENTE') {
          return '/shopping'
        } else {
          return '/products' // Para ADMINISTRADOR o cualquier otro rol
        }
      } else {
        return '/'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Función auxiliar para obtener la ruta por defecto según el rol
const getDefaultRouteForRole = (role) => {
  switch (role) {
    case 'CLIENTE':
      return '/shopping'
    case 'ADMINISTRADOR':
    default:
      return '/products'
  }
}

router.beforeEach((to, from, next) => {
  const isAuthorized = store.state.authorize
  const userRole = store.state.rol // Acceso directo al rol desde el store
  const requiresAuth = to.meta.requiresAuth
  const allowedRoles = to.meta.allowedRoles

  console.log('🔍 Navegación:', { to: to.path, from: from.path, userRole, isAuthorized })

  // Si la ruta requiere autenticación y el usuario no está autorizado
  if (requiresAuth && !isAuthorized) {
    console.log('🔴 Acceso denegado: Usuario no autorizado')
    next('/login')
    return
  }

  // Si el usuario está autorizado y trata de ir al login
  if (isAuthorized && to.name === 'Login') {
    console.log('🟢 Usuario ya autenticado, redirigiendo según rol')
    const defaultRoute = getDefaultRouteForRole(userRole)
    if (to.path !== defaultRoute) {
      next(defaultRoute)
      return
    }
  }

  // Si el usuario está autorizado y va a la raíz (/), llevarlo a su vista principal
  if (isAuthorized && to.path === '/') {
    console.log('🟢 Usuario autorizado, redirigiendo a vista principal según rol')
    const defaultRoute = getDefaultRouteForRole(userRole)
    next(defaultRoute)
    return
  }

  // Si la ruta tiene roles específicos permitidos y el usuario no tiene el rol adecuado
  if (requiresAuth && allowedRoles && !allowedRoles.includes(userRole)) {
    console.log(`🔴 Acceso denegado: Rol ${userRole} no permitido para esta ruta`)
    const defaultRoute = getDefaultRouteForRole(userRole)
    
    // Evitar redirección infinita: solo redirigir si no estamos ya en la ruta de destino
    if (to.path !== defaultRoute) {
      next(defaultRoute)
      return
    } else {
      // Si estamos intentando ir a nuestra propia ruta por defecto pero no tenemos permisos,
      // algo está mal con la configuración. Ir a home.
      console.log('⚠️ Error de configuración: usuario sin permisos para su ruta por defecto')
      next('/')
      return
    }
  }

  // Continuar con la navegación normal
  next()
})

export default router