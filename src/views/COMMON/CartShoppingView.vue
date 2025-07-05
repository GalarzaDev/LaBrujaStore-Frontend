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

        <div class="cart-total">
          <strong>Total a pagar: S/ {{ totalGeneral.toFixed(2) }}</strong>
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
            <input 
              id="correo"
              type="email"
              v-model="correo"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <input 
              id="contrasena"
              type="password"
              v-model="contrasena"
              placeholder="Tu contraseña"
              required
            />
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
          <div class="form-group">
            <label for="direccion">Dirección de Entrega</label>
            <textarea 
              id="direccion"
              v-model="direccionEntrega"
              placeholder="Ingresa tu dirección completa..."
              required
              rows="3"
            ></textarea>
          </div>

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

const store = useStore()
const router = useRouter()
const productosDisponibles = ref([])
const usuarioId = ref(null)
const pasoActual = ref(1)


const correo = ref('')
const contrasena = ref('')


const direccionEntrega = ref('')
const metodoPago = ref('')

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

const realizarCompra = async () => {
  try {
    if (!direccionEntrega.value.trim()) {
      alert('Por favor ingresa tu dirección de entrega.')
      return
    }
    
    if (!metodoPago.value) {
      alert('Por favor selecciona un método de pago.')
      return
    }

    const payloadCompra = {
      precioFinal: totalGeneral.value,
      estado: 'PAGADO',
      usuario: { id: usuarioId.value },
      promocion: null
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
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
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
  font-size: 1.1rem;
  border: none;
}

.cart-table td {
  background-color: #f8f9fa;
  color: #333;
  padding: 15px 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.cart-table tr:hover td {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.cart-table tr:last-child td {
  border-bottom: none;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #dc143c;
}

.cart-total {
  text-align: right;
  font-size: 1.5rem;
  margin-top: 25px;
  font-weight: bold;
  color: #dc143c;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #dc143c;
}

/* Formularios */
.login-form,
.payment-form {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  margin-top: 20px;
  border: 2px solid #dc143c;
  box-shadow: 0 4px 15px rgba(220, 20, 60, 0.1);
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
  font-size: 1.1rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background-color: white;
  color: #333;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #dc143c;
  box-shadow: 0 0 0 3px rgba(220, 20, 60, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group select {
  cursor: pointer;
}

/* Botones */
.cart-actions,
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
}

.continue-btn,
.pay-btn {
  padding: 15px 30px;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #dc143c, #b91c3c);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 20, 60, 0.3);
}

.continue-btn:hover,
.pay-btn:hover {
  background: linear-gradient(45deg, #b91c3c, #dc143c);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
}

.back-btn {
  padding: 15px 30px;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #6c757d, #5a6268);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.back-btn:hover {
  background: linear-gradient(45deg, #5a6268, #6c757d);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.5);
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

/* Responsive */
@media (max-width: 768px) {
  .cart-wrapper {
    padding: 20px;
  }
  
  .cart-title {
    font-size: 1.8rem;
  }
  
  .cart-table {
    overflow-x: auto;
  }
  
  .cart-table table {
    min-width: 600px;
  }
  
  .cart-total {
    font-size: 1.3rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .continue-btn,
  .pay-btn,
  .back-btn {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>