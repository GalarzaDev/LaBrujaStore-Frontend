<template>
    <v-card class="pa-2" max-width="600">
        <v-card-title class="text-h6 text-center text-red">Crear Producto</v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent="emitirFormulario" ref="formRef" v-model="valid">
            <v-text-field v-model="producto.nombre" label="Nombre del producto"
                :rules="[v => !!v || 'Campo obligatorio']" density="compact" />

            <v-textarea v-model="producto.caracteristicas" label="Características" density="compact" />

            <v-text-field v-model.number="producto.precioVenta" label="Precio de venta" type="number"
                density="compact" />

            <v-text-field v-model.number="producto.stock" label="Stock" type="number" density="compact" />

            <v-switch v-model="producto.estado" label="¿Activo?" density="compact" />

            <v-select v-model="producto.categoria.id" :items="categorias" item-title="nombre" item-value="id"
                label="Categoría" :rules="[v => !!v || 'Selecciona una categoría']" density="compact" />

            <v-file-input v-model="imagen" label="Imagen del producto" accept="image/*"
                :rules="[v => !!v || 'Selecciona una imagen']" density="compact" />

            <v-card-actions class="justify-end">
                <v-btn color="red" type="submit" :disabled="!valid" density="compact">
                    Guardar Producto
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import { listCategoryApi } from '@/api/CategoryService'

const emit = defineEmits(['submit'])
const formRef = ref()
const valid = ref(false)

const producto = reactive({
    nombre: '',
    estado: true,
    caracteristicas: '',
    stock: 0,
    precioVenta: 0.0,
    categoria: {
        id: null
    }
})

const imagen = ref(null)
const categorias = ref([])

const emitirFormulario = () => {
    if (!formRef.value.validate()) return

    const formData = new FormData()
    formData.append('producto', new Blob([JSON.stringify(producto)], { type: 'application/json' }))
    formData.append('imagen', imagen.value)

    emit('submit', formData)
}

const cargarCategorias = async () => {
    try {
        const response = await listCategoryApi()
        if (response?.data) {
            categorias.value = response.data
        }
    } catch (error) {
        console.error('Error al cargar categorías:', error)
    }
}

onMounted(() => {
    cargarCategorias()
})
</script>