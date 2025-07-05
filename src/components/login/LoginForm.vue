<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <!-- Correo -->
    <div class="form-group">
      <label for="correo">Correo electrónico</label>
      <input
        id="correo"
        type="email"
        v-model="correo"
        required
        placeholder="correo@example.com"
      />
    </div>

    <!-- Contraseña -->
    <div class="form-group">
      <label for="contra">Contraseña</label>
      <input
        id="contra"
        type="password"
        v-model="contra"
        required
        placeholder="********"
      />
    </div>

    <!-- Si está registrando -->
    <template v-if="modoRegistro">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          v-model="nombre"
          required
          placeholder="Tu nombre"
        />
      </div>

      <div class="form-group">
        <label for="apellido">Apellido</label>
        <input
          id="apellido"
          type="text"
          v-model="apellido"
          required
          placeholder="Tu apellido"
        />
      </div>
    </template>

    <!-- Botones -->
    <div class="button-group">
      <button type="submit" class="btn-submit">
        {{ modoRegistro ? 'Registrarse' : 'Iniciar sesión' }}
      </button>
      <button type="button" class="btn-back" @click="volverInicio">
        ← Volver al inicio
      </button>
      <button type="button" class="btn-toggle" @click="toggleModo">
        {{ modoRegistro ? '¿Ya tienes cuenta?' : '¿No estás registrado?' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref , defineEmits} from 'vue'
import { useRouter } from 'vue-router'
import { listRoleApi } from '@/api/RoleService'

const emit = defineEmits(['submit'])
const router = useRouter()

const correo = ref('')
const contra = ref('')
const nombre = ref('')
const apellido = ref('')
const modoRegistro = ref(false)

const volverInicio = () => {
  router.push('/')
}

const toggleModo = () => {
  modoRegistro.value = !modoRegistro.value
}

const handleSubmit = async () => {
  if (!modoRegistro.value) {
    // LOGIN
    const payload = {
      correo: correo.value,
      contra: contra.value
    }
    emit('submit', payload, 'login') // <-- SE EMITEN DOS PARÁMETROS
  } else {
    // REGISTRO
    try {
      const response = await listRoleApi()
      const roles = response?.data || []
      const rolCliente = roles.find(r => r.nombre === 'CLIENTE')
      const rolId = rolCliente ? rolCliente.id : 2

      const payload = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        contra: contra.value,
        rol: {
          id: rolId
        }
      }

      emit('submit', payload, 'register') // <-- SE EMITEN DOS PARÁMETROS
    } catch (error) {
      console.error('Error al obtener roles:', error)
    }
  }
}
</script>


<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: bold;
  color: #444;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fefefe;
  transition: border 0.2s;
}

.form-group input:focus {
  border-color: #c40606;
  outline: none;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-submit {
  background-color: #c40606;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #a40404;
}

.btn-back,
.btn-toggle {
  background-color: transparent;
  border: 2px solid #c40606;
  color: #c40606;
  padding: 10px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-back:hover,
.btn-toggle:hover {
  background-color: #ffeaea;
}
</style>
