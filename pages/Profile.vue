<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          class="hidden-xs-and-down"
          color="red"
          :small="$vuetify.breakpoint.xsOnly"
          dark
          rounded
          >Logout</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col align="center" cols="12" sm="6">
        <v-img
          :src="$auth.user.photo"
          max-width="70%"
          width="200"
          height="200"
          style="border-radius: 50%"
        >
        </v-img>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="pa-4">
          <v-card-title> Your Info </v-card-title>
          <v-form @submit.prevent="updateInfo">
            <v-text-field
              v-model="user.name"
              prepend-icon="mdi-account-circle"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              prepend-icon="mdi-email"
              label="Email"
              required
              type="email"
            ></v-text-field>
            <v-btn type="submit" color="primary">Update Info</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    const user = { ...this.$auth.user }
    return {
      user,
    }
  },
  methods: {
    ...mapActions('user', ['updateUserInfo']),
    async updateInfo() {
      try {
        const userInfo = {
          name: this.user.name,
          email: this.user.email,
        }
        this.$toast.info('Updating Info')
        const user = await this.updateUserInfo(userInfo)
        if (user.data.status) {
          await this.$auth.setUser(user.data.data.user)
          this.$toast.success('Info Updated Successfully')
        }
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
  },
}
</script>
