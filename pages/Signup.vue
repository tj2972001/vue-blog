<template>
  <v-card class="mx-auto mt-15 pa-4" max-width="600" width="80%">
    <v-card-title><h2>Signup</h2></v-card-title>
    <v-text-field
      v-model="name"
      label="Enter username"
      prepend-icon="mdi-account-circle"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Enter email"
      prepend-icon="mdi-email"
      required
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Select password"
      prepend-icon="mdi-key-variant"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordShow ? 'text' : 'password'"
      required
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-text-field
      v-model="passwordConfirm"
      label="Confirm password"
      prepend-icon="mdi-lock-question"
      :append-icon="passwordConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordConfirmShow ? 'text' : 'password'"
      required
      @click:append="passwordConfirmShow = !passwordConfirmShow"
    ></v-text-field>
    <v-checkbox label="subscribe for newsletter"></v-checkbox>
    <v-divider></v-divider>
    <v-btn class="mt-4" color="primary" @click="signup">Signup</v-btn>
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
import { mapActions } from 'vuex'
export default {
  layout: 'auth',
  data: () => ({
    passwordShow: false,
    passwordConfirmShow: false,
    email: '',
    password: '',
    name: '',
    passwordConfirm: '',
  }),
  computed: {
    checkLight() {
      return !this.$vuetify.theme.dark
    },
  },
  methods: {
    ...mapActions('user', ['fetchUserBySignup']),
    async signup() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      }
      try {
        this.$toast.info('Hold on ! Signing you up')
        await this.fetchUserBySignup(formData)
        this.$toast.success('Successfully Created account and Logged in')
        this.$router.push({ name: 'index' })
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
  },
}
</script>

<style scoped></style>
