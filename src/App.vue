<template>
  <div id="app">
    <NavBar />
  </div>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
 
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
}
</style>
