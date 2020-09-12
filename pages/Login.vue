<template>
  <v-card class="mx-auto mt-15 pa-4" max-width="600" width="80%">
    <v-card-title><h2>Login</h2></v-card-title>
    <v-text-field
      label="Enter username"
      prepend-icon="mdi-account-circle"
    ></v-text-field>
    <v-text-field
      label="Enter password"
      prepend-icon="mdi-key-variant"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordShow ? 'text' : 'password'"
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-divider></v-divider>
    <v-btn class="mt-4" color="primary">Login</v-btn>
    <v-card-text
      >New to my blog ? <nuxt-link to="/signup">Signup</nuxt-link></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    passwordShow: false,
  }),
}
</script>

<style></style>
