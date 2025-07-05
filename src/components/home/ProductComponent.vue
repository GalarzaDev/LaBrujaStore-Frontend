<template>
  <section class="carousel-wrapper">
    <h2 class="carousel-title">Productos Nuevos</h2>

    <!-- Flechas -->
    <button class="arrow left" @click="scrollLeft">&#8592;</button>
    <button class="arrow right" @click="scrollRight">&#8594;</button>

    <!-- Carrusel -->
    <div ref="carousel" class="carousel-container">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="getImageUrl(product.id)" alt="Producto" />
        <h3>{{ product.nombre }}</h3>
        <p class="description">{{ product.caracteristicas }}</p>
        <p class="price">S/ {{ product.precioVenta }}</p>
        <button class="buy-button" @click="comprarProducto(product.id)">Comprar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { listProductApi } from '@/api/ProductService'

const products = ref([])
const carousel = ref(null)
const store = useStore()
const router = useRouter()

const getProducts = async () => {
  try {
    const response = await listProductApi()
    if (response?.data) {
      // Filtrar productos activos con imagen
      products.value = response.data.filter(p => p.estado && p.imagen !== null)
    }
  } catch (error) {
    console.error('Error al cargar productos', error)
  }
}

const getImageUrl = (id) => `http://localhost:8080/api/productos/${id}/imagen`

const scrollLeft = () => {
  carousel.value.scrollLeft -= 300
}

const scrollRight = () => {
  carousel.value.scrollLeft += 300
}

const comprarProducto = (id) => {
  store.commit('setProductoSeleccionado', id)
  router.push('/productDetail')
}

onMounted(() => {
  getProducts()
})
</script>


<style scoped>
.carousel-wrapper {
  padding: 2rem 1rem;
  background: #fafafa;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.carousel-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #b71c1c;
}

.carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 12px;
  padding: 0 30px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: center;
}
.carousel-container::-webkit-scrollbar {
  display: none;
}

.product-card {
  flex: 0 0 220px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

.product-card h3 {
  font-size: 1rem;
  margin: 5px 0;
  color: #222;
}

.description {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 5px;
}

.price {
  font-size: 0.9rem;
  color: #b71c1c;
  font-weight: bold;
  margin-bottom: 8px;
}

.buy-button {
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 6px 10px;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #a31515;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 6px 10px;
  cursor: pointer;
  z-index: 1;
}

.arrow.left {
  left: 0;
}

.arrow.right {
  right: 0;
}
</style>
