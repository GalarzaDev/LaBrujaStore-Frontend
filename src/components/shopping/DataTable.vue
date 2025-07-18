<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      density="comfortable"
      item-value="id"
    >
      <!-- Cliente -->
      <template v-slot:[`item.usuario`]="{ item }">
        {{ item.usuario?.nombre }} {{ item.usuario?.apellido }}
      </template>

      <!-- Fecha -->
      <template v-slot:[`item.fecha`]="{ item }">
        {{ new Date(item.fecha).toLocaleString() }}
      </template>

      <!-- Precio Final -->
      <template v-slot:[`item.precioFinal`]="{ item }">
        S/ {{ item.precioFinal.toFixed(2) }}
      </template>

      <!-- Estado -->
      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado === 'PAGADO' ? 'green' : 'orange'" text-color="white" small>
          {{ item.estado }}
        </v-chip>
      </template>

    
    </v-data-table>
  </v-card>
</template>

<script setup>
import { defineProps  } from 'vue'



defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

// Nuevas columnas adaptadas a tu array
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Cliente', key: 'usuario' },
  { title: 'Fecha', key: 'fecha' },
  { title: 'Precio Final', key: 'precioFinal' },
  { title: 'Estado', key: 'estado' },

]

</script>
