<template>
  <form @submit.prevent="handleSubmit" class="login-form">
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

    <div class="button-group">
      <button type="submit" class="btn-submit">Iniciar sesión</button>
      <button type="button" class="btn-back" @click="volverInicio">
        ← Volver al inicio
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref , defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['submit'])
const router = useRouter()

const correo = ref('')
const contra = ref('')

const handleSubmit = () => {
  const body = {
    correo: correo.value,
    contra: contra.value
  }
  emit('submit', body)
}

const volverInicio = () => {
  router.push('/')
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

.btn-back {
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

.btn-back:hover {
  background-color: #ffeaea;
}
</style>
