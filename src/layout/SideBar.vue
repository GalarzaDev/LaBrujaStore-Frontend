<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    permanent
  >
    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.to"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const menuItems = [
  { title: 'Productos', to: '/product', icon: 'mdi-home' },

]
</script>

<style scoped>

</style>
