<template>
  <div class="profile-form">
    <h2>👤 Editar Perfil</h2>

    <form @submit.prevent="submitForm" class="formulario">
      <div class="fila">
        <div class="campo">
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" required />
        </div>
        <div class="campo">
          <label>Apellido:</label>
          <input v-model="form.apellido" type="text" required />
        </div>
      </div>

      <div class="fila">
        <div class="campo">
          <label>Correo:</label>
          <input v-model="form.correo" type="email" required />
        </div>
        <div class="campo campo-rol">
          <label>Rol:</label>
          <input type="text" value="CLIENTE" disabled />
        </div>
      </div>

      <button type="submit" class="btn-guardar">Guardar cambios</button>
      <p v-if="success" class="mensaje-exito">✅ Cambios guardados correctamente.</p>
      <p v-if="error" class="mensaje-error">❌ Ocurrió un error al actualizar.</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { updateUserApi } from '@/api/UserService'

const store = useStore()
const user = store.getters.getUserData

const success = ref(false)
const error = ref(false)

const form = reactive({
  id: user.id,
  nombre: user.nombre,
  apellido: user.apellido,
  correo: user.correo,
  rol: {
    id: 2
  }
})

const submitForm = async () => {
  success.value = false
  error.value = false

  try {
    const response = await updateUserApi(form, user.id)
    if (response?.data) {
      const newUser = {
        ...response.data,
        authorize: store.state.authorize // <-- preservar estado de sesión
      }
      store.commit('setUserData', newUser)
      success.value = true
    }
  } catch (err) {
    console.error('Error al editar usuario', err)
    error.value = true
  }
}

</script>

<style scoped>
.profile-form {
  background-color: #ffffff;
  color: #151515;
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

.campo-rol {
  flex: 0 0 150px;
}

.campo label {
  font-weight: bold;
  color: #121111;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.campo input[type="text"],
.campo input[type="email"] {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #d32f2f;
  background-color: #ffffff;
  color: #333;
  font-size: 0.9rem;
}

.campo input[disabled] {
  background-color: #f0f0f0;
  color: #999;
  cursor: not-allowed;
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

.mensaje-exito {
  font-size: 0.85rem;
  color: #4caf50;
  margin-top: 0.5rem;
  text-align: right;
}

.mensaje-error {
  font-size: 0.85rem;
  color: #f44336;
  margin-top: 0.5rem;
  text-align: right;
}

@media (max-width: 600px) {
  .fila {
    flex-direction: column;
    gap: 0.8rem;
  }

  .campo-rol {
    flex: 1;
  }

  .btn-guardar {
    align-self: stretch;
  }
}
</style>
