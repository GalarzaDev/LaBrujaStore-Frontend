<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="productos"
      class="elevation-1"
      density="comfortable"
      item-value="id"
    >
      <!-- Columna personalizada: Categoría -->
      <template v-slot:[`item.categoria`]="{ item }">
        {{ item.categoria?.nombre || 'Sin categoría' }}
      </template>

      <!-- Columna personalizada: Estado -->
      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado ? 'green' : 'red'" text-color="white" small>
          {{ item.estado ? 'Activo' : 'Inactivo' }}
        </v-chip>
      </template>

      <!-- Acciones -->
      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn icon size="small" @click="editar(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="small" color="error" @click="eliminar(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  productos: {
    type: Array,
    default: () => []
  }
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Precio (S/.)', key: 'precioVenta' },
  { title: 'Stock', key: 'stock' },
  { title: 'Categoría', key: 'categoria' },
  { title: 'Estado', key: 'estado' },
  { title: 'Acciones', key: 'acciones', sortable: false }
]

const editar = (producto) => {
  console.log('Editar producto:', producto)
}

const eliminar = (producto) => {
  console.log('Eliminar producto:', producto)
}
</script>
