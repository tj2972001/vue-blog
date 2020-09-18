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
          @click="logOut"
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
    <v-row>
      <!--      <v-col cols="12" align="center">-->
      <!--        <v-card class="pa-4">-->
      <!--          <v-card-title> Password Reset </v-card-title>-->
      <!--          <v-form @submit.prevent="updatePassword">-->
      <!--            <v-text-field-->
      <!--              v-model="passwordData.passwordCurrent"-->
      <!--              label="Enter current password"-->
      <!--              prepend-icon="mdi-key-variant"-->
      <!--              :append-icon="passwordShowCurPassword ? 'mdi-eye' : 'mdi-eye-off'"-->
      <!--              :type="passwordShowCurPassword ? 'text' : 'password'"-->
      <!--              required-->
      <!--              @click:append="passwordShowCurPassword = !passwordShowCurPassword"-->
      <!--            ></v-text-field>-->
      <!--            <v-text-field-->
      <!--              v-model="passwordData.password"-->
      <!--              label="Select new password"-->
      <!--              prepend-icon="mdi-key-variant"-->
      <!--              :append-icon="passwordShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'"-->
      <!--              :type="passwordShowNewPassword ? 'text' : 'password'"-->
      <!--              required-->
      <!--              @click:append="passwordShowNewPassword = !passwordShowNewPassword"-->
      <!--            ></v-text-field>-->
      <!--            <v-text-field-->
      <!--              v-model="passwordData.passwordConfirm"-->
      <!--              label="Confirm new password"-->
      <!--              prepend-icon="mdi-lock-question"-->
      <!--              :append-icon="-->
      <!--                passwordShowConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'-->
      <!--              "-->
      <!--              :type="passwordShowConfirmNewPassword ? 'text' : 'password'"-->
      <!--              required-->
      <!--              @click:append="-->
      <!--                passwordShowConfirmNewPassword = !passwordShowConfirmNewPassword-->
      <!--              "-->
      <!--            ></v-text-field>-->
      <!--            <v-btn type="submit" color="primary">Update Password</v-btn>-->
      <!--          </v-form>-->
      <!--        </v-card>-->
      <!--      </v-col>-->
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
      // passwordShowCurPassword: false,
      // passwordShowNewPassword: false,
      // passwordShowConfirmNewPassword: false,
      // passwordData: {
      //   passwordCurrent: '',
      //   password: '',
      //   passwordConfirm: '',
      // },
    }
  },
  methods: {
    ...mapActions('user', ['updateUserInfo']),
    ...mapActions('user', ['logOutUser']),
    // ...mapActions('user', ['updatePassword']),

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
    async logOut() {
      try {
        this.$toast.info('Logging you out')
        const response = await this.logOutUser()
        if (response.data.status === 'success') {
          await this.$auth.logout()
          this.$toast.success('Successfully logged you out')
        }
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
    // async updatePassword() {
    //   try {
    //     const formData = { ...this.passwordData }
    //     this.$toast.info('Updating password')
    //     const response = await this.updatePassword(formData)
    //     if (response.data.status === 'success') {
    //       this.$toast.info('Successfully updated password')
    //     }
    //   } catch (e) {
    //     this.$toast.error(e.response.data.message)
    //   }
    // },
  },
}
</script>
