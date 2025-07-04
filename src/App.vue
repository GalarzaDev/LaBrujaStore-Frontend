<template>
  <v-app>
    <!-- Mostrar NavBar solo si NO estás en login y authorize es false -->
    <NavBar v-if="!isLogin && !authorize" />

    <!-- Mostrar SideBar solo si authorize es true -->
    <SideBar v-if="authorize" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'
import SideBar from '@/layout/SideBar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    NavBar,
    SideBar
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const authorize = computed(() => store.state.authorize)
    const isLogin = computed(() => route.path === '/login' || route.path === '/login/')

    return { authorize, isLogin }
  }
}
</script>
