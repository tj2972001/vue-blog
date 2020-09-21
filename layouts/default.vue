<template>
  <v-app>
    <NavBar />
    <v-main style="overflow-x: hidden">
      <nuxt :key="$route.fullPath" />
    </v-main>
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

<style></style>
