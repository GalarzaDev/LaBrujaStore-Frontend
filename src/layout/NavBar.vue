<template>
  <div>
    <!-- Barra superior -->
    <div class="navbar-top">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <div class="search-container">
        <div class="category-select">Categorias</div>
        <input type="text" placeholder="Estoy buscando..." class="search-input" />
        <span class="search-icon">🔍</span>
      </div>
      <div class="cart">
        🛒
        <span class="cart-count">0</span>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="navbar-bottom">
      <nav>
        <a href="#">INICIO</a>
        <a href="#">CATALOGO</a>
        <a href="#">CONTACTANOS</a>
        <a href="#">ACERCA DE</a>
        <a href="#">COTIZACIÓN</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
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

.navbar-bottom {
  background-color: #c40606;
  padding: 10px 0;
  text-align: center;
}

.navbar-bottom nav a {
  color: white;
  margin: 0 20px;
  font-weight: bold;
  text-decoration: none;
}
</style>
