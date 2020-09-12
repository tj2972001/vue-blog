<template>
  <v-card class="mx-auto mt-15 pa-4" max-width="600" width="80%">
    <v-card-title><h2>Signup</h2></v-card-title>
    <v-text-field
      label="Enter username"
      prepend-icon="mdi-account-circle"
      required
    ></v-text-field>
    <v-text-field
      label="Enter email"
      prepend-icon="mdi-email"
      required
      type="email"
    ></v-text-field>
    <v-text-field
      label="Select password"
      prepend-icon="mdi-key-variant"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordShow ? 'text' : 'password'"
      required
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-text-field
      label="Confirm password"
      prepend-icon="mdi-lock-question"
      :append-icon="passwordConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordConfirmShow ? 'text' : 'password'"
      required
      @click:append="passwordConfirmShow = !passwordConfirmShow"
    ></v-text-field>
    <v-checkbox label="subscribe for newsletter"></v-checkbox>
    <v-divider></v-divider>
    <v-btn class="mt-4" color="primary">Signup</v-btn>
    <v-card-subtitle class="text-sm-right red--text text--lighten-1"
      >You will be logged in after successfull Signup</v-card-subtitle
    >
    <v-card-text
      >Already have account ?
      <nuxt-link to="/login">Login</nuxt-link></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    passwordShow: false,
    passwordConfirmShow: false,
  }),
  computed: {
    checkLight() {
      return !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped>
.redColor {
  color: red;
}
</style>
