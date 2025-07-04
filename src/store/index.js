import { createStore } from 'vuex'

// Función para cargar datos del localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('userStore')
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error al cargar datos del localStorage:', error)
  }
  return {
    nombre: '',
    apellido: '',
    correo: '',
    rol: '',
    authorize: false
  }
}

// Función para guardar datos en localStorage
const saveToStorage = (state) => {
  try {
    localStorage.setItem('userStore', JSON.stringify({
      nombre: state.nombre,
      apellido: state.apellido,
      correo: state.correo,
      rol: state.rol,
      authorize: state.authorize
    }))
  } catch (error) {
    console.error('Error al guardar datos en localStorage:', error)
  }
}

const store = createStore({
  state: {
    ...loadFromStorage() // Cargar datos al inicializar
  },
  mutations: {
    setNombre(state, nombre) {
      state.nombre = nombre
      saveToStorage(state)
    },
    setApellido(state, apellido) {
      state.apellido = apellido
      saveToStorage(state)
    },
    setCorreo(state, correo) {
      state.correo = correo
      saveToStorage(state)
    },
    setRol(state, rol) {
      state.rol = rol
      saveToStorage(state)
    },
    setAuthorize(state, authorize) {
      state.authorize = authorize
      saveToStorage(state)
    },
    // Mutación para establecer todos los datos de una vez
    setUserData(state, userData) {
      state.nombre = userData.nombre || ''
      state.apellido = userData.apellido || ''
      state.correo = userData.correo || ''
      state.rol = userData.rol || ''
      state.authorize = userData.authorize || false
      saveToStorage(state)
    },
    clearUser(state) {
      state.nombre = ''
      state.apellido = ''
      state.correo = ''
      state.rol = ''
      state.authorize = false
      // Limpiar también el localStorage
      localStorage.removeItem('userStore')
    }
  },
  getters: {
    fullName: (state) => `${state.nombre} ${state.apellido}`,
    isLoggedIn: (state) => !!state.correo && state.authorize,
    isAuthorized: (state) => state.authorize,
    getUserData: (state) => ({
      nombre: state.nombre,
      apellido: state.apellido,
      correo: state.correo,
      rol: state.rol,
      authorize: state.authorize
    })
  }
})

export default store