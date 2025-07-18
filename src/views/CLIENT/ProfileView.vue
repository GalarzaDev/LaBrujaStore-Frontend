<template>
  <section class="section">
    <div class="form-container">
      <FormProfile />
    </div>

    <div class="direction-container">
      <DirectionForm :data="dataDirection" @add="addItem" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { createDirectionApi, listByDirectionApi } from '@/api/DirectionService'
import DirectionForm from '@/components/profile/DirectionForm.vue'
import FormProfile from '@/components/profile/FormProfile.vue'
const store = useStore()
const dataDirection = ref([]) // Aquí se almacenan las direcciones del usuario

const getDirection = async () => {
  try {
    const id = store.getters.getUserData.id
    const response = await listByDirectionApi(id)
    if (response?.data) {
      dataDirection.value = response.data
    }
  } catch (error) {
    console.error("Error al listar direcciones", error)
  }
}



const addItem = async (payload) => {
  try {
    const response = await createDirectionApi(payload)
    if (response) {
      console.log("Dirección guardada")
      await getDirection() // Recargar direcciones después de crear una nueva
    }
  } catch (error) {
    console.error("Error al crear dirección", error)
  }
}

onMounted(() => {
  getDirection()
})
</script>

<style scoped>
.text-center {
  text-align: center;
}
.section {
  padding: 2rem;
  margin: auto;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-container,
.direction-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(136, 14, 79, 0.2);
  padding: 1.5rem;
}

</style>
