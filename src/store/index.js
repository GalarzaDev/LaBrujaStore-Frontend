import { createStore } from 'vuex'

// Función para cargar datos del localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('userStore')
    if (data) {
      const parsed = JSON.parse(data)
      return {
        nombre: parsed.nombre || '',
        apellido: parsed.apellido || '',
        correo: parsed.correo || '',
        rol: parsed.rol || '',
        authorize: parsed.authorize || false,
        productoSeleccionado: parsed.productoSeleccionado || null,
        carrito: parsed.carrito || []
      }
    }
  } catch (error) {
    console.error('Error al cargar datos del localStorage:', error)
  }
  return {
    nombre: '',
    apellido: '',
    correo: '',
    rol: '',
    authorize: false,
    productoSeleccionado: null,
    carrito: []
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
      authorize: state.authorize,
      productoSeleccionado: state.productoSeleccionado,
      carrito: state.carrito
    }))
  } catch (error) {
    console.error('Error al guardar datos en localStorage:', error)
  }
}

const store = createStore({
  state: {
    ...loadFromStorage() // Cargar datos iniciales
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
    setUserData(state, userData) {
      state.nombre = userData.nombre || ''
      state.apellido = userData.apellido || ''
      state.correo = userData.correo || ''
      state.rol = userData.rol || ''
      state.authorize = userData.authorize || false
      state.productoSeleccionado = userData.productoSeleccionado || null
      state.carrito = userData.carrito || []
      saveToStorage(state)
    },
    clearUser(state) {
      state.nombre = ''
      state.apellido = ''
      state.correo = ''
      state.rol = ''
      state.authorize = false
      state.productoSeleccionado = null
      state.carrito = []
      localStorage.removeItem('userStore')
    },
    setProductoSeleccionado(state, productoId) {
      state.productoSeleccionado = productoId
      saveToStorage(state)
    },
    agregarAlCarrito(state, item) {
      state.carrito.push(item)
      saveToStorage(state)
    },
    limpiarCarrito(state) {
      state.carrito = []
      saveToStorage(state)
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
    }),
    getProductoSeleccionado: (state) => state.productoSeleccionado,
    getCarrito: (state) => state.carrito
  }
})

export default store
