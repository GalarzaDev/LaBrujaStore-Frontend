import { createRouter, createWebHistory } from 'vue-router'

// Importa tus vistas
import Home from '@/views/HomeView.vue'
import Catalogo from '@/views/CatalogView.vue'
//import Contacto from '@/views/Contacto.vue'
//import Acerca from '@/views/Acerca.vue'
//import Cotizacion from '@/views/Cotizacion.vue'

const routes = [
  { path: '/', name: 'Inicio', component: Home },
  { path: '/catalogo', name: 'Catalogo', component: Catalogo },
  //{ path: '/contactanos', name: 'Contacto', component: Contacto },
  //{ path: '/acerca-de', name: 'Acerca', component: Acerca },
 // { path: '/cotizacion', name: 'Cotizacion', component: Cotizacion }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
