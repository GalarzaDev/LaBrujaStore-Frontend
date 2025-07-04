<template>
  <v-card class="pa-4" max-width="600">
    <v-card-title class="text-h6 text-center" style="color: #b71c1c">
      Editar Producto
    </v-card-title>
    <v-divider class="mb-4" />

    <v-form @submit.prevent="emitirFormulario" ref="formRef" v-model="valid">
      <v-text-field
        v-model="form.nombre"
        label="Nombre del producto"
        density="compact"
      
        class="mb-3"
      />

      <v-textarea
        v-model="form.caracteristicas"
        label="Características"
        rows="3"
        density="compact"
      
        class="mb-3"
      />

      <v-text-field
        v-model.number="form.precioVenta"
        label="Precio de venta (S/.)"
        type="number"
        density="compact"
      
        class="mb-3"
      />

      <v-text-field
        v-model.number="form.stock"
        label="Stock"
        type="number"
        density="compact"
      
        class="mb-3"
      />

      <v-switch
        v-model="form.estado"
        label="¿Activo?"
        inset
        color="red"
      
        class="mb-3"
      />

      <v-select
        v-model="form.categoria.id"
        :items="categorias"
        item-title="nombre"
        item-value="id"
        label="Categoría"
        density="compact"
      
        class="mb-3"
      />

      <v-file-input
        v-model="imagen"
        label="Imagen del producto"
        accept="image/*"
        density="compact"
        prepend-icon="mdi-camera"
      
        class="mb-2"
      />

      <v-card-actions class="justify-end mt-4">
        <v-btn color="red" type="submit" :disabled="!valid" density="compact">
          Guardar Producto
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>


<script setup>
import { ref, reactive, watch, onMounted , defineProps, defineEmits } from 'vue'
import { listCategoryApi } from '@/api/CategoryService'

const props = defineProps({
  producto: Object
})
const emit = defineEmits(['submit'])

const formRef = ref()
const valid = ref(false)

const form = reactive({
  id: null,
  nombre: '',
  estado: true,
  caracteristicas: '',
  stock: 0,
  precioVenta: 0,
  categoria: {
    id: null
  }
})

const imagen = ref(null)
const categorias = ref([])

watch(
  () => props.producto,
  (nuevo) => {
    if (nuevo) {
      form.id = nuevo.id
      form.nombre = nuevo.nombre
      form.estado = nuevo.estado
      form.caracteristicas = nuevo.caracteristicas
      form.stock = nuevo.stock
      form.precioVenta = nuevo.precioVenta
      form.categoria.id = nuevo.categoria?.id || null
    }
  },
  { immediate: true }
)

const emitirFormulario = () => {
  const formData = new FormData()
  formData.append('producto', new Blob([JSON.stringify(form)], { type: 'application/json' }))
  if (imagen.value) formData.append('imagen', imagen.value)
  emit('submit', formData , form.id)
}

const cargarCategorias = async () => {
  try {
    const response = await listCategoryApi()
    if (response?.data) categorias.value = response.data
  } catch (error) {
    console.error('Error cargando categorías', error)
  }
}

onMounted(() => {
  cargarCategorias()
})
</script>
