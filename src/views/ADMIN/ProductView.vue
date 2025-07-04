<template>
  <v-container class="mt-8 ml-2 mr-5 pr-10">
    <v-row justify="space-between" align="center" class="header-row">
      <h1 class="titulo">Mantenimiento de Productos</h1>
      <v-btn color="red" prepend-icon="mdi-plus" class="btn-agregar" @click="dialog = true">
        Nuevo Producto
      </v-btn>
    </v-row>

    <ProductoTable :productos="productos" @editar="editarProducto" @eliminar="eliminarProducto" />

    <v-dialog v-model="dialog" max-width="700">
      <FormCreate @submit="createProduct" />
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="700">
      <UpdateForm :producto="productoEditado" @submit="updateProduct" />
    </v-dialog>

  </v-container>
</template>

<script setup>
import ProductoTable from '@/components/products/DataTable.vue'
import FormCreate from '@/components/products/FormCreate.vue'
import UpdateForm from '@/components/products/UpdateForm.vue'

import { listProductApi, createProductApi , updateProductApi } from '@/api/ProductService'
import { ref, onMounted } from 'vue'

const productos = ref([])
const dialog = ref(false)
const dialogEdit = ref(false)
const productoEditado = ref(null)

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

const createProduct = async (formData) => {
  try {
    const response = await createProductApi(formData)
    if (response?.status === 201 || response?.status === 200) {
      dialog.value = false
      await getProduct()
    }
  } catch (error) {
    console.error('Error al guardar producto', error)
  }
}

const editarProducto = (producto) => {
  productoEditado.value = producto
  dialogEdit.value = true
}

const updateProduct = async (formData , id) => {

  try {
    const response = await updateProductApi(formData , id)
    if (response?.status === 200) {
      dialogEdit.value = false
      await getProduct()
    }
  } catch (error) {
    console.error('Error al actualizar producto', error)
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
