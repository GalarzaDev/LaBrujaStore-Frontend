<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      density="comfortable"
      item-value="id"
    >
      <template v-slot:[`item.producto`]="{ item }">
        {{ item.detalleCompra?.producto?.nombre || 'Sin producto' }}
      </template>

      <template v-slot:[`item.estado`]="{ item }">
        <v-chip
          :color="item.estado === 'SOLICITADA' ? 'orange' : item.estado === 'APROBADA' ? 'green' : 'red'"
          text-color="white"
          small
        >
          {{ item.estado }}
        </v-chip>
      </template>

      <template v-slot:[`item.fechaSolicitud`]="{ item }">
        {{ new Date(item.fechaSolicitud).toLocaleString() }}
      </template>

   
    </v-data-table>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'



defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Producto', key: 'producto' },
  { title: 'Motivo', key: 'motivo' },
  { title: 'Descripción', key: 'descripcion' },
  { title: 'Estado', key: 'estado' },
  { title: 'Fecha Solicitud', key: 'fechaSolicitud' },

]

</script>
