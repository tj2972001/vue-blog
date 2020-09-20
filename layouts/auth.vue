<template>
  <v-app>
    <AuthNavBar />
    <v-main>
      <nuxt />
      <h2>Or <nuxt-link to="/">Go home</nuxt-link></h2>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import AuthNavBar from '@/components/AuthNavBar'
import Footer from '@/components/Footer'

export default {
  components: {
    AuthNavBar,
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
