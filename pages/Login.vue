<template>
  <v-card class="mx-auto mt-15 pa-4" max-width="600" width="80%">
    <v-card-title><h2>Login</h2></v-card-title>
    <v-text-field
      v-model="email"
      label="Enter email"
      prepend-icon="mdi-account-circle"
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Enter password"
      prepend-icon="mdi-key-variant"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordShow ? 'text' : 'password'"
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-divider></v-divider>
    <v-btn class="mt-4" color="primary" @click="login">Login</v-btn>
    <v-card-text
      >New to my blog ? <nuxt-link to="/signup">Signup</nuxt-link></v-card-text
    >
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'auth',
  data: () => ({
    passwordShow: false,
    email: '',
    password: '',
  }),
  computed: {
    user: (state) => state.user.user,
  },
  methods: {
    ...mapActions('user', ['fetchUserByLogin']),

    async login() {
      const formData = {}
      formData.email = this.email
      formData.password = this.password
      try {
        this.$toast.info('Logging in ')
        await this.fetchUserByLogin(formData)
        this.$toast.success('Login successfully')
        this.$router.push({
          name: 'index',
        })
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
  },
}
</script>

<style></style>
