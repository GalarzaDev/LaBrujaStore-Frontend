<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      density="comfortable"
      item-value="id"
    >
  
      <template v-slot:[`item.categoria`]="{ item }">
        {{ item.categoria?.nombre || 'Sin categoría' }}
      </template>


      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado ? 'green' : 'red'" text-color="white" small>
          {{ item.estado ? 'Activo' : 'Inactivo' }}
        </v-chip>
      </template>
      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn icon size="small"   @click="emitEditar(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="small" color="error" @click="emitEliminar(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { defineProps , defineEmits} from 'vue'
const emit = defineEmits(['editar', 'eliminar'])
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'nombre' },

  { title: 'Acciones', key: 'acciones', sortable: false }
]

const emitEditar = (item) => {
  emit('editar', item)
}

const emitEliminar = (item) => {
  emit('eliminar', item)
}
</script>
