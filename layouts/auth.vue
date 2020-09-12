<template>
  <v-app>
    <AuthNavBar />
    <v-content>
      <nuxt />
      <h2>Or <nuxt-link to="/">Go home</nuxt-link></h2>
    </v-content>
  </v-app>
</template>

<script>
import AuthNavBar from '@/components/AuthNavBar'
export default {
  components: {
    AuthNavBar,
  },
}
</script>

<style>
h2 {
  text-align: center;
  margin: 10px 0;
}
</style>
