<template>
  <v-app>
    <NavBar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },
}
</script>

<style>
h2 {
  text-align: center;
  margin: 10px 0;
}
</style>
