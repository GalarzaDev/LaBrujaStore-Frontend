<template>
  <v-container class="mt-8 ml-2 mr-5 pr-10">
    <v-row justify="space-between" align="center" class="header-row">
      <h1 class="titulo">Mantenimiento de devoluciones</h1>
      <v-btn color="red" prepend-icon="mdi-plus" class="btn-agregar" @click="dialog = true">
        Nueva devolucion
      </v-btn>
    </v-row>

    <Datatable :items="items" @editar="editItem" @eliminar="deleteItem" />

    <v-dialog v-model="dialog" max-width="700">
      <FormCreate @submit="createItem" />
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="700">
      <UpdateForm :item="selectedItem" @submit="updateItem" />
    </v-dialog>

  </v-container>
</template>

<script setup>
import Datatable from '@/components/devolucion/DataTable.vue'
import FormCreate from '@/components/devolucion/FormCreate.vue'
import UpdateForm from '@/components/products/UpdateForm.vue'

import { updateProductApi } from '@/api/ProductService'
import { listCategoryApi , createCategoryApi} from '@/api/devolucionService'
import { ref, onMounted } from 'vue'

const items = ref([])
const dialog = ref(false)
const dialogEdit = ref(false)
const selectedItem = ref(null)

const getItems = async () => {
  try {
    const response = await listCategoryApi()
    if (response) {
      items.value = response.data
    }
  } catch {
    console.error('Error al listar items')
  }
}

const createItem = async (formData) => {
  try {
    const response = await createCategoryApi(formData)
    if (response?.status === 201 || response?.status === 200) {
      dialog.value = false
      await  getItems()
    }
  } catch (error) {
    console.error('Error al guardar item', error)
  }
}

const editItem = (item) => {
  selectedItem.value = item
  dialogEdit.value = true
}

const updateItem = async (formData, id) => {

  try {
    const response = await updateProductApi(formData, id)
    if (response?.status === 200) {
      dialogEdit.value = false
      await  getItems()
    }
  } catch (error) {
    console.error('Error al actualizar item', error)
  }
}

onMounted(() => {
   getItems()
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
