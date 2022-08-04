<template>
  <div>
    <v-container v-if="isLoggedIn">
      <v-row class="mt-5">
        <v-col align="center" cols="12" sm="6">
          <img
            :src="userDetails.photo"
            max-width="70%"
            width="200"
            height="200"
            style="border-radius: 50%"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pa-4">
            <v-card-title> Your Info </v-card-title>

            <v-form @submit.prevent="updateInfo">
              <v-text-field
                v-model="userDetails.name"
                prepend-icon="mdi-account-circle"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="userDetails.email"
                prepend-icon="mdi-email"
                label="Email"
                required
                type="email"
              ></v-text-field>
              <span v-if="userDetails.isEmailVerified">Email is verified</span>
              <v-btn
                v-else
                text
                small
                outlined
                color="green"
                @click="verifyEmailMethod"
                >Click here to verify mail</v-btn
              >
              <v-file-input
                id="photo"
                accept="image/*"
                label="Profile picture"
                prepend-icon="mdi-face"
                show-size
                placeholder="Select profile photo"
              />
              <v-btn type="submit" outlined text color="teal"
                >Update Info</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <v-card class="pa-4">
            <v-card-title> Password Reset </v-card-title>
            <v-form @submit.prevent="updateMyPassword">
              <v-text-field
                v-model="passwordData.passwordCurrent"
                label="Enter current password"
                prepend-icon="mdi-key-variant"
                :append-icon="
                  passwordShowCurPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="passwordShowCurPassword ? 'text' : 'password'"
                required
                @click:append="
                  passwordShowCurPassword = !passwordShowCurPassword
                "
              ></v-text-field>
              <v-text-field
                v-model="passwordData.password"
                label="Select new password"
                prepend-icon="mdi-key-variant"
                :append-icon="
                  passwordShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="passwordShowNewPassword ? 'text' : 'password'"
                required
                @click:append="
                  passwordShowNewPassword = !passwordShowNewPassword
                "
              ></v-text-field>
              <v-text-field
                v-model="passwordData.passwordConfirm"
                label="Confirm new password"
                prepend-icon="mdi-lock-question"
                :append-icon="
                  passwordShowConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="passwordShowConfirmNewPassword ? 'text' : 'password'"
                required
                @click:append="
                  passwordShowConfirmNewPassword = !passwordShowConfirmNewPassword
                "
              ></v-text-field>
              <v-btn type="submit" outlined text color="teal"
                >Update Password</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <div class="app-row" style="text-align: center">
        <v-btn color="red" class="mt-5" text outlined @click="logOut">
          Logout
        </v-btn>
      </div>
      <div class="app-row">Your Liked articles</div>
    </v-container>
    <div v-else>
      <v-banner
        max-width="500"
        outlined
        elevation="30"
        rounded
        sticky
        icon="mdi-lock"
        icon-color="primary"
        class="mt-10 mx-auto"
      >
        Please Login to view user: {{ userDetails }} isLoggedIn:
        {{ isLoggedIn }}
        <template v-slot:actions>
          <v-btn text color="primary" to="/login"> Login </v-btn>
        </template>
      </v-banner>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { syncUser } from "assets/js/mixins";
export default {
  mixins: [syncUser],
  data() {
    return {
      pageTitle: "Your profile",
      passwordShowCurPassword: false,
      passwordShowNewPassword: false,
      passwordShowConfirmNewPassword: false,
      passwordData: {
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },
  computed: {
    // userInfo: {
    //   name: this.userDetails.name,
    //   email: this.userDetails.email,
    //   isEmailVerified: this.userDetails.isEmailVerified,
    // },
  },
  methods: {
    ...mapActions("user", [
      "updateUserInfo",
      "logOutUser",
      "updatePassword",
      "verifyEmail",
    ]),
    async updateInfo() {
      try {
        const formData = new FormData();
        formData.append("name", this.userDetails.name);
        formData.append("email", this.userDetails.email);
        formData.append("photo", document.getElementById("photo").files[0]);
        this.$toast.info("Updating Info");
        const user = await this.updateUserInfo(formData);
        if (user.data.status === "success") {
          console.log("user.data.status ", user.data.status);
          this.$toast.success("Info Updated Successfully in vuex store");
        }
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
    async logOut() {
      try {
        this.$toast.info("Logging you out");
        const response = await this.logOutUser();
        if (response.data.status === "success") {
          this.$toast.success("Successfully logged you out");
          this.$router.push({ name: "index" });
        }
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
    async updateMyPassword() {
      try {
        const formData = { ...this.passwordData };
        this.$toast.info("Updating password");
        const response = await this.updatePassword(formData);
        if (response.data.status === "success") {
          this.$toast.info("Successfully updated password");
          await this.logOut();
        } else {
          this.$toast.error(response.data);
        }
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
    async verifyEmailMethod() {
      try {
        console.log("In emailm verify");
        const result = await this.verifyEmail();
        if (result.data.status === "success") {
          this.$toast.info(
            "Mail sent successfully for verification. Please verify mail and Login again"
          );
          this.$toast.info("Logging you out");
          this.logOut();
        }
        console.log("result ", result);
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
  },
  head() {
    return {
      title: this.pageTitle,
    };
  },
};
</script>
