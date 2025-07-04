<template>
    <v-card class="pa-2" max-width="600">
        <v-card-title class="text-h6 text-center text-red">Crear Categoria</v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent="emitirFormulario" ref="formRef" v-model="valid">
            <v-text-field v-model="items.nombre" label="Nombre de la categoria"
                :rules="[v => !!v || 'Campo obligatorio']" density="compact" />

          

            <v-card-actions class="justify-end">
                <v-btn color="red" type="submit" :disabled="!valid" density="compact">
                    Guardar Categoria
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'

const emit = defineEmits(['submit'])

const valid = ref(false)

const items = reactive({
    nombre: '',
  
})



const emitirFormulario = () => {


    emit('submit', items)
}

</script>