<template>
  <v-card class="forgotPassowordReset">
    <h2 class="forgotPassowordReset__title">Reset password</h2>
    <v-form
      class="forgotPassowordReset__form"
      @submit.prevent="forgotPassowordResetMethod"
    >
      <v-text-field
        v-model="password"
        required
        append-icon="mdi-key-variant"
        class="ma-2"
        label="Password"
      ></v-text-field>
      <v-text-field
        v-model="passwordConfirm"
        required
        class="ma-2"
        append-icon="mdi-key-variant"
        label="Confirm password"
      ></v-text-field>
      <v-text-field
        v-model="token"
        class="ma-2"
        required
        label="Enter token"
      ></v-text-field>
      <v-btn class="ma-2" type="submit" text color="teal">Submit</v-btn>
    </v-form>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      pageTitle: "Reset your password",
      password: "",
      passwordConfirm: "",
      token: "",
    };
  },
  head() {
    return {
      title: this.pageTitle,
    };
  },
  methods: {
    ...mapActions("user", ["forgotPasswordReset"]),
    async forgotPassowordResetMethod() {
      try {
        const formData = {};
        formData.password = this.password;
        formData.passwordConfirm = this.passwordConfirm;
        formData.token = await this.token;
        const result = await this.forgotPasswordReset(formData);
        console.log("Result: ", result);
        if (result.data.status === "success") {
          this.$toast.info(result.data.message);
          this.$nuxt.refresh();
          this.$router.push({ name: "index" });
        }
      } catch (err) {
        this.$toast.error(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.forgotPassowordReset {
  margin: 5rem auto;
  width: 600px;
  max-width: 95%;
  text-align: center;
  &__form {
  }
}
</style>
