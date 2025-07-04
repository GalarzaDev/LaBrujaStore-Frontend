<template>
  <div class="login-page">
    <div class="image-section" />
    <div class="form-section">
      <div class="login-container">
        <h1>Iniciar Sesión</h1>
        <LoginForm @submit="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/login/LoginForm.vue'
import { userLoginApi } from '@/api/UserService'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const handleLogin = async (body) => {
  try {
    const response = await userLoginApi(body)

    console.log('🟢 Response data:', response.data)

    if (response && response.data && response.status === 200) {
      const { nombre, apellido, correo, rol } = response.data

      // Opción 1: Usar mutaciones individuales
      store.commit('setNombre', nombre)
      store.commit('setApellido', apellido)
      store.commit('setCorreo', correo)
      store.commit('setRol', rol?.nombre || '')
      store.commit('setAuthorize', true) // Establecer como autorizado

      // Opción 2: Usar una sola mutación (más eficiente)
      // store.commit('setUserData', {
      //   nombre,
      //   apellido,
      //   correo,
      //   rol: rol?.nombre || '',
      //   authorize: true
      // })

      console.log('🟢 Datos guardados en el store correctamente')
      console.log('🟢 Estado del store:', store.getters.getUserData)

      router.push('/')
    } else {
      // Si no es status 200, no autorizar
      store.commit('setAuthorize', false)
      console.log('🔴 Login fallido - no autorizado')
    }
  } catch (error) {
    console.error('🔴 Error al iniciar sesión', error)
    // En caso de error, asegurar que no esté autorizado
    store.commit('setAuthorize', false)
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

/* Mostrar la imagen solo en pantallas grandes */
@media (min-width: 768px) {
  .image-section {
    display: block;
  }
}
</style>