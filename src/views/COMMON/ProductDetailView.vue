<template>
  <section v-if="product" class="detail-wrapper">
    <div class="image-container">
      <img :src="getImageUrl(product.id)" alt="Imagen del producto" />
    </div>

    <div class="info-container">
      <h1 class="title">{{ product.nombre }}</h1>

      <p class="caracteristicas">
        {{ product.caracteristicas }}
      </p>

      <ul class="product-data">
        <li><strong>Estado:</strong> {{ product.estado ? 'nuevo' : 'descontinuado' }}</li>
        <li><strong>En stock:</strong> {{ product.stock }}</li>
        <li><strong>Lima:</strong> 2</li>
        <li><strong>Arequipa:</strong> 0</li>
      </ul>

      <div class="price-box">
        <h2>S/. {{ product.precioVenta }}</h2>
        <p>*Sin recargo adicional por pago en Efectivo o Transferencia.</p>
        <p>Impuestos incluidos</p>

        <div class="quantity-box">
          <button @click="decreaseQty">−</button>
          <input type="number" v-model="cantidad" min="1" />
          <button @click="increaseQty">+</button>
        </div>

        <button class="buy-btn" @click="agregarAlCarrito">
          <i class="mdi mdi-cart"></i> Agregar Carrito
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { listProductApi } from '@/api/ProductService'

const store = useStore()

const product = ref(null)
const cantidad = ref(1)

const getImageUrl = (id) => `http://localhost:8080/api/productos/${id}/imagen`

const getProductById = async () => {
  try {
    const response = await listProductApi()
    if (response?.data) {
      const allProducts = response.data
      const selectedId = store.state.productoSeleccionado
      product.value = allProducts.find(p => p.id === selectedId)
    }
  } catch (error) {
    console.error('Error cargando producto', error)
  }
}

const increaseQty = () => cantidad.value++
const decreaseQty = () => {
  if (cantidad.value > 1) cantidad.value--
}

const agregarAlCarrito = () => {
  if (!product.value) return

  const nuevoItem = {
    cantidad: cantidad.value,
    precioParcial: cantidad.value * product.value.precioVenta,
    compra: {
      id: null 
    },
    producto: {
      id: product.value.id
    }
  }

  store.commit('agregarAlCarrito', nuevoItem)
  alert('Producto agregado al carrito.')
}

onMounted(() => {
  getProductById()
})
</script>


<style scoped>
.detail-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 40px;
  max-width: 1100px;
  margin: auto;
  align-items: flex-start;
}

.image-container img {
  width: 500px;
  height: auto;
  border: 1px solid #eee;
  border-radius: 6px;
}

.info-container {
  flex: 1;
  min-width: 300px;
}

.title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.caracteristicas {
  font-size: 1rem;
  color: #444;
  margin-bottom: 12px;
  line-height: 1.4;
}

.product-data li {
  font-size: 0.95rem;
  margin-bottom: 6px;
}

.price-box {
  margin-top: 20px;
  padding: 20px;
  border: 2px dashed red;
  border-radius: 10px;
  background: #fff7f7;
}

.price-box h2 {
  font-size: 2rem;
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.quantity-box {
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.quantity-box button {
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-box input {
  width: 60px;
  text-align: center;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buy-btn {
  background: white;
  border: 2px solid red;
  color: red;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;
}

.buy-btn:hover {
  background: red;
  color: white;
}
</style>
