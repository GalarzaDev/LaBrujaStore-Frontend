<template>
  <v-container class="mt-8 ml-2 mr-5 pr-10">
    <v-row justify="space-between" align="center" class="header-row">
      <h1 class="titulo">Mantenimiento de Productos</h1>
      <v-btn color="red" prepend-icon="mdi-plus" class="btn-agregar" @click="abrirFormulario">
        Nuevo Producto
      </v-btn>
    </v-row>

    <ProductoTable :productos="productos" />
  </v-container>
</template>

<script setup>
import ProductoTable from '@/components/products/DataTable.vue'
import { listProductApi } from '@/api/ProductService'
import { ref, onMounted } from 'vue'

const productos = ref([])

const abrirFormulario = () => {
  console.log('Abrir formulario de producto')
}

const getProduct = async () => {
  try {
    const response = await listProductApi()
    if (response) {
      productos.value = response.data
    }
  } catch {
    console.error('Error al listar productos')
  }
}

onMounted(() => {
  getProduct()
})
</script>

<style scoped>
.header-row {
  margin-bottom: 20px;
  border-bottom: 2px solid #b71c1c;
  padding-bottom: 10px;
}

.titulo {
  font-size: 28px;
  font-weight: bold;
  color: #b71c1c;
  margin: 0;
}

.btn-agregar {
  background-color: #b71c1c;
  color: white;
  font-weight: 500;
}

.btn-agregar:hover {
  background-color: #a31515;
}
</style>
