<template>
  <div class="login-page">
    <div class="image-section" />
    <div class="form-section">
      <div class="login-container">
        <h1>{{ isRegistering ? 'Registrarse' : 'Iniciar Sesión' }}</h1>
        <LoginForm @submit="handleAuth" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/login/LoginForm.vue'
import { loginUserApi, createUserApi } from '@/api/UserService'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()
const isRegistering = ref(false)

const handleAuth = async (body, tipo) => {
  if (tipo === 'login') {
    try {
      const response = await loginUserApi(body)

      if (response && response.data && response.status === 200) {
        const {id,  nombre, apellido, correo, rol } = response.data

        store.commit('setNombre', nombre)
        store.commit('setApellido', apellido)
        store.commit('setCorreo', correo)
         store.commit('setId', id)
        store.commit('setRol', rol?.nombre || '')
        store.commit('setAuthorize', true)

        router.push('/')
      } else {
        store.commit('setAuthorize', false)
        alert('Credenciales incorrectas')
      }
    } catch (error) {
      store.commit('setAuthorize', false)
      alert('Error al iniciar sesión')
    }
  }

  if (tipo === 'register') {
    try {
      const response = await createUserApi(body)

      if (response && response.status === 201) {
        alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.')
        window.location.reload() 
      } else {
        alert('No se pudo registrar el usuario.')
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      alert('Hubo un error durante el registro.')
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}

.image-section {
  flex: 1;
  background-image: url('/public/login/login.jpg');
  background-size: cover;
  background-position: center;
  display: none;
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding: 40px 20px;
}

.login-container {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-container h1 {
  margin-bottom: 25px;
  color: #333;
}

@media (min-width: 768px) {
  .image-section {
    display: block;
  }
}
</style>
