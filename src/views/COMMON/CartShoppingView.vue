<template>
  <section class="cart-wrapper">
    <h1 class="cart-title">Tu Carrito de Compras</h1>

    <div v-if="groupedItems.length > 0">
      <div v-if="pasoActual === 1" class="cart-table">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Imagen</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in groupedItems" :key="item.producto.id">
              <td>{{ item.nombre }}</td>
              <td>
                <img :src="getImageUrl(item.producto.id)" alt="Imagen" class="product-img" />
              </td>
              <td>{{ item.cantidad }}</td>
              <td>S/ {{ item.precioUnitario.toFixed(2) }}</td>
              <td>S/ {{ item.subtotal.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Sección de código promocional -->
        <div class="promo-section">
          <div class="promo-input-group">
            <input 
              v-model="codigoPromocion" 
              type="text" 
              placeholder="Ingresa código promocional" 
              class="promo-input"
              :disabled="promocionAplicada"
            />
            <button 
              @click="aplicarCodigoPromocion" 
              class="promo-btn"
              :disabled="!codigoPromocion || promocionAplicada"
            >
              {{ promocionAplicada ? 'Aplicado' : 'Aplicar' }}
            </button>
          </div>
          
          <div v-if="mensajePromocion" class="promo-message" :class="{ 'error': !promocionValida }">
            {{ mensajePromocion }}
          </div>
        </div>

        <!-- Resumen de totales -->
        <div class="cart-total">
          <div class="total-line">
            <span>Subtotal:</span>
            <span>S/ {{ totalGeneral.toFixed(2) }}</span>
          </div>
          
          <div v-if="promocionAplicada" class="total-line discount">
            <span>Descuento ({{ (promocionData.descuento * 100).toFixed(0) }}%):</span>
            <span>-S/ {{ montoDescuento.toFixed(2) }}</span>
          </div>
          
          <div class="total-line final">
            <strong>Total a pagar: S/ {{ totalConDescuento.toFixed(2) }}</strong>
          </div>
        </div>

        <div class="cart-actions">
          <button @click="siguientePaso" class="continue-btn">Continuar</button>
        </div>
      </div>

      <div v-if="pasoActual === 2" class="login-form">
        <h2 class="form-title">Datos de Usuario</h2>

        <form @submit.prevent="loginUsuario">
          <div class="form-group">
            <label for="correo">Correo Electrónico</label>
            <input id="correo" type="email" v-model="correo" placeholder="ejemplo@correo.com" required />
          </div>

          <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <input id="contrasena" type="password" v-model="contrasena" placeholder="Tu contraseña" required />
          </div>

          <div class="form-actions">
            <button type="button" @click="pasoAnterior" class="back-btn">Atrás</button>
            <button type="submit" class="continue-btn">Continuar</button>
          </div>
        </form>
      </div>

      <div v-if="pasoActual === 3" class="payment-form">
        <h2 class="form-title">Información de Pago</h2>

        <form @submit.prevent="realizarCompra">
          <v-autocomplete 
            v-model="direccionSeleccionada" 
            :items="direcciones" 
            item-title="label" 
            item-value="id"
            label="Dirección de Entrega" 
            placeholder="Selecciona una dirección" 
            required
          ></v-autocomplete>

          <div class="form-group">
            <label for="metodoPago">Método de Pago</label>
            <select id="metodoPago" v-model="metodoPago" required>
              <option value="">Selecciona un método</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" @click="pasoAnterior" class="back-btn">Atrás</button>
            <button type="submit" class="pay-btn">Pagar Ahora</button>
          </div>
        </form>
      </div>
    </div>

    <p v-else class="empty-cart">Tu carrito está vacío.</p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { listProductApi } from '@/api/ProductService'
import { createShoppingApi } from '@/api/ShoppingService'
import { createDetailShoppingApi } from '@/api/ShoppingService'
import { loginUserApi } from '@/api/UserService'
import { listByDirectionApi } from '@/api/DirectionService'
import { getPromocionCodeApi } from '@/api/PromocionService'

const store = useStore()
const router = useRouter()
const productosDisponibles = ref([])
const usuarioId = ref(null)
const pasoActual = ref(1)

const correo = ref('')
const contrasena = ref('')
const metodoPago = ref('')

const direcciones = ref([])
const direccionSeleccionada = ref(null)

// Variables para promociones
const codigoPromocion = ref('')
const promocionData = ref(null)
const promocionAplicada = ref(false)
const promocionValida = ref(false)
const mensajePromocion = ref('')

const getImageUrl = (id) => `http://localhost:8080/api/productos/${id}/imagen`

const cargarProductos = async () => {
  try {
    const response = await listProductApi()
    if (response?.data) {
      productosDisponibles.value = response.data
    }
  } catch (error) {
    console.error('Error al cargar productos', error)
  }
}

const groupedItems = computed(() => {
  const agrupado = {}

  store.state.carrito.forEach(item => {
    const id = item.producto.id
    const productoInfo = productosDisponibles.value.find(p => p.id === id)
    const nombre = productoInfo?.nombre || 'Producto desconocido'
    const precioUnitario = item.precioParcial / item.cantidad

    if (!agrupado[id]) {
      agrupado[id] = {
        producto: item.producto,
        cantidad: 0,
        subtotal: 0,
        precioUnitario,
        nombre
      }
    }

    agrupado[id].cantidad += item.cantidad
    agrupado[id].subtotal += item.precioParcial
  })

  return Object.values(agrupado)
})

const totalGeneral = computed(() => {
  return groupedItems.value.reduce((acc, item) => acc + item.subtotal, 0)
})

const montoDescuento = computed(() => {
  if (!promocionAplicada.value || !promocionData.value) return 0
  return totalGeneral.value * promocionData.value.descuento
})

const totalConDescuento = computed(() => {
  return totalGeneral.value - montoDescuento.value
})

const aplicarCodigoPromocion = async () => {
  if (!codigoPromocion.value.trim()) {
    mensajePromocion.value = 'Por favor ingresa un código promocional'
    promocionValida.value = false
    return
  }

  try {
    const response = await getPromocionCodeApi(codigoPromocion.value)
    if (response) {
      promocionData.value = response.data
      promocionAplicada.value = true
      promocionValida.value = true
      mensajePromocion.value = `¡Código aplicado! ${(response.data.descuento * 100).toFixed(0)}% de descuento`
    }
  } catch (error) {
    console.error("Código no existe", error)
    mensajePromocion.value = 'Código promocional inválido'
    promocionValida.value = false
    promocionAplicada.value = false
    promocionData.value = null
  }
}

const siguientePaso = () => {
  pasoActual.value++
}

const pasoAnterior = () => {
  pasoActual.value--
}

const loginUsuario = async () => {
  try {
    const response = await loginUserApi({
      correo: correo.value,
      contra: contrasena.value
    })

    if (response?.data?.id) {
      usuarioId.value = response.data.id
      await geDireccion()
      siguientePaso()
    } else {
      alert('Usuario no registrado. Debes registrarte primero.')
      router.push('/register')
    }
  } catch (error) {
    console.error('Error en login', error)
    alert('Error al iniciar sesión. Verifica tus credenciales.')
  }
}

const geDireccion = async () => {
  try {
    if (!usuarioId.value) return
    const response = await listByDirectionApi(usuarioId.value)

    if (response?.data) {
      direcciones.value = response.data.map(dir => ({
        id: dir.id,
        label: `${dir.tipo} - ${dir.calle} ${dir.numero}, ${dir.ciudad} (${dir.codigoPostal})`
      }))
    }
  } catch (error) {
    console.error("Error al listar direcciones", error)
  }
}

const realizarCompra = async () => {
  try {
    if (!direccionSeleccionada.value) {
      alert('Por favor selecciona una dirección de entrega.')
      return
    }

    if (!metodoPago.value) {
      alert('Por favor selecciona un método de pago.')
      return
    }

    const payloadCompra = {
      precioFinal: totalGeneral.value, // Precio original sin descuento
      direccion: { id: parseInt(direccionSeleccionada.value) },
      estado: 'PENDIENTE',
      usuario: { id: usuarioId.value },
      promocion: promocionAplicada.value && promocionData.value ? { id: promocionData.value.id } : null
    }

    const compraResponse = await createShoppingApi(payloadCompra)
    const compraId = compraResponse?.data?.id
    if (!compraId) throw new Error('No se pudo crear la compra.')

    for (const item of store.state.carrito) {
      const detallePayload = {
        cantidad: item.cantidad,
        precioParcial: item.precioParcial,
        compra: { id: compraId },
        producto: { id: item.producto.id }
      }

      await createDetailShoppingApi(detallePayload)
    }

    alert('Compra realizada con éxito.')
    store.commit('limpiarCarrito')
    router.push('/gracias')
  } catch (err) {
    console.error('Error al realizar compra', err)
    alert('Ocurrió un error al procesar la compra.')
  }
}

onMounted(() => {
  cargarProductos()
  geDireccion()
})
</script>

<style scoped>
.cart-wrapper {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
  background-color: white;
  color: #333;
  min-height: 100vh;
}

.cart-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #dc143c;
}

.cart-table {
  background-color: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(220, 20, 60, 0.1);
}

.cart-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
}

.cart-table th {
  background-color: #dc143c;
  color: white;
  padding: 15px 12px;
  text-align: center;
  font-weight: bold;
  border: none;
}

.cart-table td {
  background-color: #f8f9fa;
  color: #333;
  padding: 15px 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #dc143c;
}

/* Sección de código promocional */
.promo-section {
  margin: 20px 0;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.promo-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.promo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  text-transform: uppercase;
}

.promo-input:focus {
  outline: none;
  border-color: #dc143c;
}

.promo-btn {
  padding: 12px 20px;
  background-color: #dc143c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.promo-btn:hover:not(:disabled) {
  background-color: #b91c3c;
}

.promo-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.promo-message {
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.promo-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

/* Resumen de totales */
.cart-total {
  margin-top: 25px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #dc143c;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.total-line.discount {
  color: #28a745;
  font-weight: bold;
}

.total-line.final {
  font-size: 1.5rem;
  font-weight: bold;
  color: #dc143c;
  border-top: 2px solid #dc143c;
  padding-top: 10px;
  margin-top: 15px;
}

/* Formularios */
.login-form, .payment-form {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  margin-top: 20px;
  border: 2px solid #dc143c;
}

.form-title {
  color: #dc143c;
  font-size: 1.8rem;
  margin-bottom: 25px;
  text-align: center;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
}

.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #dc143c;
}

/* Botones */
.cart-actions, .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
}

.continue-btn, .pay-btn {
  padding: 15px 30px;
  background: linear-gradient(45deg, #dc143c, #b91c3c);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.continue-btn:hover, .pay-btn:hover {
  background: linear-gradient(45deg, #b91c3c, #dc143c);
  transform: translateY(-2px);
}

.back-btn {
  padding: 15px 30px;
  background: linear-gradient(45deg, #6c757d, #5a6268);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.back-btn:hover {
  background: linear-gradient(45deg, #5a6268, #6c757d);
}

.empty-cart {
  text-align: center;
  font-size: 1.4rem;
  color: #dc143c;
  margin-top: 100px;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 2px dashed #dc143c;
}

@media (max-width: 768px) {
  .cart-wrapper {
    padding: 20px;
  }
  
  .promo-input-group {
    flex-direction: column;
  }
  
  .total-line {
    font-size: 1rem;
  }
  
  .total-line.final {
    font-size: 1.3rem;
  }
}
</style>