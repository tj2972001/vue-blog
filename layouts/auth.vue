<template>
  <v-app>
    <AuthNavBar />
    <v-main>
      <nuxt />
      <h2 class="textGrd">Or <nuxt-link to="/">Go home</nuxt-link></h2>
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
