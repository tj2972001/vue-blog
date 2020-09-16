<template>
  <v-app>
    <NavBar />
    <v-content>
      <nuxt :key="$route.fullPath" />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer'
export default {
  components: {
    NavBar,
    Footer,
  },
}
</script>

<style>
h2 {
  text-align: center;
  margin: 10px 0;
}
</style>
