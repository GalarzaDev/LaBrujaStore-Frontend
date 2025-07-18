<template>
  <div class="direction-form">
    <h2>📍 Lista de direcciones</h2>
    <ul v-if="data.length > 0" class="direccion-list">
      <li v-for="direccion in data" :key="direccion.id" class="direccion-item">
        <strong>{{ direccion.tipo }}</strong>: {{ direccion.calle }} {{ direccion.numero }},
        {{ direccion.ciudad }} - {{ direccion.codigoPostal }}
      </li>
    </ul>
    <p v-else class="no-direcciones">No tienes direcciones registradas.</p>

    <hr class="divider" />

    <h2>➕ Agregar nueva dirección</h2>
    <form @submit.prevent="submitForm" class="formulario">
      <div class="fila">
        <div class="campo">
          <label>Tipo:</label>
          <input v-model="form.tipo" type="text" required placeholder="Casa, Oficina..." />
        </div>
        <div class="campo checkbox">
          <label>¿Es predeterminado?</label>
          <input type="checkbox" v-model="form.esPredeterminado" />
        </div>
      </div>

      <div class="fila">
        <div class="campo">
          <label>Calle:</label>
          <input v-model="form.calle" type="text" required />
        </div>
        <div class="campo campo-numero">
          <label>Número:</label>
          <input v-model="form.numero" type="text" required />
        </div>
      </div>

      <div class="fila">
        <div class="campo">
          <label>Ciudad:</label>
          <input v-model="form.ciudad" type="text" required />
        </div>
        <div class="campo campo-codigo">
          <label>Código Postal:</label>
          <input v-model="form.codigoPostal" type="text" required />
        </div>
      </div>

      <button type="submit" class="btn-guardar">Guardar dirección</button>
    </form>
  </div>
</template>

<script setup>
import { reactive  , defineProps , defineEmits} from 'vue'
import { useStore } from 'vuex'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add'])
const store = useStore()

const form = reactive({
  tipo: '',
  calle: '',
  numero: '',
  ciudad: '',
  codigoPostal: '',
  esPredeterminado: false,
  estado: true,
  usuario: {
    id: store.getters.getUserData.id
  }
})

const submitForm = () => {
  emit('add', { ...form })
  form.tipo = ''
  form.calle = ''
  form.numero = ''
  form.ciudad = ''
  form.codigoPostal = ''
  form.esPredeterminado = false
}
</script>

<style scoped>
.direction-form {
  background-color: #ffffff;
  color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 0 10px #880e4f;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  color: #e53935;
  margin-bottom: 1rem;
  text-align: center;
}

.direccion-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.direccion-item {
  background: #ffffff;
  border-left: 5px solid #d32f2f;
  padding: 0.8rem;
  margin-bottom: 0.6rem;
  border-radius: 5px;
  color: #151515;
}

.no-direcciones {
  color: #111010;
  text-align: center;
}

.divider {
  border: none;
  height: 2px;
  background-color: #d32f2f;
  margin: 1.5rem 0;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fila {
  display: flex;
  gap: 1rem;
  align-items: end;
}

.campo {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.campo-numero {
  flex: 0 0 120px;
}

.campo-codigo {
  flex: 0 0 150px;
}

.campo label {
  font-weight: bold;
  color: #121111;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.campo input[type="text"] {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #d32f2f;
  background-color: #ffffff;
  color: #333;
  font-size: 0.9rem;
}

.campo.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;
}

.campo.checkbox input[type="checkbox"] {
  margin: 0;
}

.btn-guardar {
  background-color: #c62828;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
  align-self: flex-end;
  width: auto;
}

.btn-guardar:hover {
  background-color: #b71c1c;
}

@media (max-width: 600px) {
  .fila {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .campo-numero,
  .campo-codigo {
    flex: 1;
  }
  
  .btn-guardar {
    align-self: stretch;
  }
}
</style>