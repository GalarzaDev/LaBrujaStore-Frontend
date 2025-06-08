<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'

export default {
  components: { NavBar }
}
</script>
