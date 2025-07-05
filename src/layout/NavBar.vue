<template>
  <div>
    <!-- Barra superior -->
    <div class="navbar-top">
      <img src="/logo.jpeg" alt="Logo" class="logo" />

      <div class="search-container">
        <div class="category-select">Categorias</div>
        <input type="text" placeholder="Estoy buscando..." class="search-input" />
        <span class="search-icon">🔍</span>
      </div>

      <div class="navbar-actions">
        <router-link to="/cart" class="cart-link" title="Ver carrito">
          <div class="cart">
            <i class="mdi mdi-cart-outline"></i>
            <span class="cart-count" v-if="carritoCount > 0">{{ carritoCount }}</span>
          </div>
        </router-link>


        <router-link to="/login" class="login-link" title="Iniciar sesión">
          <i class="mdi mdi-account"></i>
        </router-link>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="navbar-bottom">
      <nav>
        <router-link to="/">INICIO</router-link>
        <router-link to="/catalog">CATÁLOGO</router-link>
        <router-link to="/contact">CONTACTANOS</router-link>
        <router-link to="/about">ACERCA DE</router-link>
        <router-link to="/quote">COTIZACIÓN</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Computado reactivo para contar productos en el carrito
const carritoCount = computed(() => store.state.carrito.length)
</script>


<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@mdi/font@7.3.67/css/materialdesignicons.min.css');

.navbar-top {
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
}

.logo {
  height: 40px;
}

.search-container {
  display: flex;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  margin: 0 30px;
  max-width: 900px;
}

.category-select {
  padding: 10px;
  border-right: 2px dashed black;
  background-color: white;
  font-weight: bold;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.search-icon {
  padding: 10px;
  color: gray;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart {
  color: white;
  font-size: 24px;
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background: white;
  color: black;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 6px;
}

.login-link {
  color: white;
  font-size: 24px;
  text-decoration: none;
}

.login-link:hover {
  color: #ccc;
}

.navbar-bottom {
  background-color: #c40606;
  padding: 10px 0;
  text-align: center;
}

.navbar-bottom nav a,
.navbar-bottom nav router-link {
  color: white;
  margin: 0 20px;
  font-weight: bold;
  text-decoration: none;
}

.navbar-bottom nav router-link:hover {
  text-decoration: underline;
}

.cart-link {
  text-decoration: none;
  color: rgb(255, 6, 6);
}

</style>
