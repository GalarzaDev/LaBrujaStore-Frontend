<template>
    <conteiner>
        <h1 class="text-center"> Perfil de cliente</h1>
    </conteiner>


    <DirectionForm :data="addItem" />
</template>


<script setup>

import { createDirectionApi , listByDirectionApi } from '@/api/DirectionService'
import DirectionForm from '@/components/profile/DirectionForm.vue'
import { onMounted, ref} from 'vue'

const dataDirection = ref('')


const getDirection = async(id) => {

    try{
        const response = await listByDirectionApi(id) 
        if(response){
            dataDirection.value = response.data;
        }

    }catch{
        console.error("error al listar direcciones ")
    }
}

const addItem = async (payload) => {
    try {
        const response = await createDirectionApi(payload)
        if (response) {
            console.log("direccion guardada")
        }

    } catch {
        console.error("error al crear direccion ")
    }

}


onMounted(()=> {
    getDirection
})

</script>