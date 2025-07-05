<template>
  <v-navigation-drawer v-model="drawer" app permanent class="custom-sidebar" width="280">
    <!-- Header del sidebar -->
    <div class="sidebar-header">
      <div class="logo-container">
        <v-icon class="logo-icon" size="40">mdi-store</v-icon>
        <div class="logo-text">
          <h3>Admin Panel</h3>
          <span class="subtitle">Gestión</span>
        </div>
      </div>
    </div>


    <v-divider class="custom-divider"></v-divider>


    <v-list class="custom-list" nav>
      <v-list-item v-for="(item, index) in itemsVisibles" :key="index" :to="item.to" link class="custom-list-item"
        active-class="active-item">
        <template v-slot:prepend>
          <v-icon class="item-icon">{{ item.icon }}</v-icon>
        </template>

        <v-list-item-title class="item-title">
          {{ item.title }}
        </v-list-item-title>

        <template v-slot:append>
          <div class="active-indicator"></div>
        </template>
      </v-list-item>
    </v-list>


    <!-- Footer del sidebar -->
    <template v-slot:append>
      <div class="sidebar-footer">
        <v-btn class="logout-btn" variant="outlined" block @click="logout">
          <v-icon left>mdi-logout</v-icon>
          Cerrar Sesión
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const router = useRouter()
const store = useStore()
const drawer = ref(true)
const rol = computed(() => store.state.rol)
const menuItems = [
  { title: 'Dashboard', to: '/dashboard', icon: 'mdi-view-dashboard', rolesPermitidos: ['ADMINISTRADOR'] },
  { title: 'Productos', to: '/products', icon: 'mdi-package-variant', rolesPermitidos: ['ADMINISTRADOR'] },
  { title: 'Categorías', to: '/category', icon: 'mdi-tag-multiple', rolesPermitidos: ['ADMINISTRADOR'] },
  { title: 'Inventario', to: '/inventory', icon: 'mdi-warehouse', rolesPermitidos: ['ADMINISTRADOR'] },
  { title: 'Reportes', to: '/reports', icon: 'mdi-chart-line', rolesPermitidos: ['ADMINISTRADOR'] },
  { title: 'Configuración', to: '/settings', icon: 'mdi-cog', rolesPermitidos: ['ADMINISTRADOR'] },
  { title: 'Mis Compras', to: '/shopping', icon: 'mdi-cart', rolesPermitidos: ['CLIENTE'] },
  { title: 'Perfil', to: '/perfil', icon: 'mdi-account', rolesPermitidos: ['CLIENTE'] },
]

const itemsVisibles = computed(() =>
  menuItems.filter(item => item.rolesPermitidos.includes(rol.value))
)


const logout = () => {
  store.commit('clearUser')
  router.push('/login')
}
</script>

<style scoped>
.custom-sidebar {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%) !important;
  border-right: 3px solid #dc2626 !important;
}

.sidebar-header {
  padding: 24px 20px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  margin-bottom: 8px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  color: white !important;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
}

.logo-text h3 {
  color: white;
  margin: 0;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo-text .subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 400;
}

.custom-divider {
  border-color: #dc2626 !important;
  opacity: 0.3;
  margin: 0 16px;
}

.custom-list {
  padding: 16px 12px !important;
}

.custom-list-item {
  margin-bottom: 8px !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
  padding: 12px 16px !important;
  position: relative;
  overflow: hidden;
}

.custom-list-item:hover {
  background: rgba(220, 38, 38, 0.1) !important;
  transform: translateX(4px);
}

.custom-list-item.active-item {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
  color: white !important;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
}

.custom-list-item.active-item .item-icon,
.custom-list-item.active-item .item-title {
  color: white !important;
}

.item-icon {
  color: #dc2626 !important;
  margin-right: 16px !important;
  font-size: 1.3rem !important;
  transition: all 0.3s ease;
}

.custom-list-item:hover .item-icon {
  color: #ef4444 !important;
  transform: scale(1.1);
}

.item-title {
  color: #e5e5e5 !important;
  font-weight: 500 !important;
  font-size: 0.95rem !important;
  transition: all 0.3s ease;
}

.custom-list-item:hover .item-title {
  color: white !important;
}

.active-indicator {
  width: 4px;
  height: 100%;
  background: white;
  border-radius: 2px;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-list-item.active-item .active-indicator {
  opacity: 1;
}

.sidebar-footer {
  padding: 20px 16px;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(220, 38, 38, 0.2);
}

.logout-btn {
  color: #dc2626 !important;
  border-color: #dc2626 !important;
  background: transparent !important;
  transition: all 0.3s ease !important;
}

.logout-btn:hover {
  background: #dc2626 !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* Animaciones adicionales */
.custom-list-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.custom-list-item:hover::before {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .custom-sidebar {
    width: 260px !important;
  }

  .logo-text h3 {
    font-size: 1.1rem;
  }

  .item-title {
    font-size: 0.9rem !important;
  }
}
</style>