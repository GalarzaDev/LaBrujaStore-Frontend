<template>
    <v-card class="pa-4" max-width="600">
        <v-card-title class="text-h6 text-center text-red">Solicitar Devolución</v-card-title>
        <v-divider class="mb-3"></v-divider>

        <v-form @submit.prevent="emitirFormulario" ref="formRef" v-model="valid">
            <v-textarea v-model="form.motivo" label="Motivo de devolución" :rules="[v => !!v || 'Campo obligatorio']"
                density="compact" required />

            <v-textarea v-model="form.descripcion" label="Descripción detallada"
                :rules="[v => !!v || 'Campo obligatorio']" density="compact" required />

            <v-autocomplete v-model="selectedCompraId" :items="compras" item-title="id" item-value="id"
                label="Selecciona una compra" return-object :rules="[v => !!v || 'Debes seleccionar una compra']"
                @update:model-value="fetchDetalleCompra" density="compact" class="mt-3" />

            <v-autocomplete v-if="detalles.length" v-model="selectedDetalleId" :items="detalles"
                item-title="producto.nombre" item-value="id" label="Selecciona producto para devolución" return-object
                :rules="[v => !!v || 'Selecciona un producto']" density="compact" class="mt-3" />

            <v-card-actions class="justify-end mt-4">
               <v-btn color="red" type="submit" :disabled="!valid || !selectedDetalleId">
  Enviar Devolución
</v-btn>

            </v-card-actions>

        </v-form>
    </v-card>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const emit = defineEmits(['submit'])

const valid = ref(false)
const form = reactive({
    motivo: '',
    descripcion: ''
})

const store = useStore()
const usuarioId = store.state.id

const compras = ref([])
const detalles = ref([])
const selectedCompraId = ref(null)
const selectedDetalleId = ref(null)

// Consumir compras por usuario
const fetchCompras = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/compras/usuario/${usuarioId}`)
        compras.value = res.data
    } catch (err) {
        console.error('Error cargando compras:', err)
    }
}

// Consumir detalles de compra seleccionada
const fetchDetalleCompra = async (compraId) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/detalles-compra/compra/${compraId.id}`)
        detalles.value = res.data
    } catch (err) {
        console.error('Error cargando detalle compra:', err)
    }
}

const emitirFormulario = () => {
    const payload = {
        motivo: form.motivo,
        descripcion: form.descripcion,
        usuario: { id: usuarioId },
        detalleCompra: { id: selectedDetalleId.value.id }
    }
    emit('submit', payload)
}

onMounted(() => {
    fetchCompras()
})
</script>