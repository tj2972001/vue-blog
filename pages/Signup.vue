<template>
  <v-card class="mx-auto mt-15 pa-4" width="600">
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
    <p class="text-lg-right" :class="{ redColor: checkLight }">
      *You will be automatically logged in after signup
    </p>
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
