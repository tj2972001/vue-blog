<template>
  <!-- <v-card class="mx-auto mt-15 pa-4" max-width="600" width="80%">
    <v-card-title class="textGrd"><h2>Signup</h2></v-card-title>
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
  </v-card> -->
  <section class="signup-page">
    <div class="llcontainer signup">
      <div class="box signup__box">
        <h2>
          <nuxt-link to="/signup">Sign Up </nuxt-link>
        </h2>
        <div class="row">
          <input v-model="name" type="text" placeholder="Enter name" />
          <v-icon color="white" class="ml-2">mdi-account-outline</v-icon>
        </div>
        <div class="row">
          <input
            v-model="email"
            type="email"
            scale="1.6"
            placeholder="Enter email"
          />
          <v-icon class="ml-2" color="white">mdi-email-outline</v-icon>
        </div>
        <div class="row">
          <input
            v-model="password"
            :type="passwordShow ? 'text' : 'password'"
            placeholder="Enter password"
            @click:append="passwordShow = !passwordShow"
          />
          <v-icon class="ml-2" color="white">mdi-key-outline</v-icon>
        </div>
        <div class="row">
          <input
            v-model="passwordConfirm"
            :type="passwordConfirmShow ? 'text' : 'password'"
            placeholder="Confirm password"
            @click:append="passwordConfirmShow = !passwordConfirmShow"
          />
          <v-icon class="ml-2" color="white">mdi-eye-outline</v-icon>
        </div>
        <div class="row">
          <button id="signup" class="btn-medium" @click="signupMethod">
            Signup
          </button>
        </div>
        <div class="row">
          <nuxt-link to="/login">login instead</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    passwordShow: false,
    passwordConfirmShow: false,
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  }),
  computed: {
    checkLight() {
      return !this.$vuetify.theme.dark;
    },
  },
  methods: {
    ...mapActions("user", ["signUp"]),
    async signupMethod() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      };
      try {
        this.$toast.info("Hold on ! Signing you up");
        await this.signUp(formData);
        this.$toast.success("Successfully Created account ");
        this.$toast.info("Now you can Login", {
          duration: 10000,
        });
        await this.$router.push({ name: "Login" });
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active,
.nuxt-link-active {
  color: #fff;
}
.signup {
  text-align: center;
  font-size: 2rem;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: url("~assets/images/bg/home-bg.jpg");
  background-size: 100% 100%;
  @media only screen and (max-width: 600px) {
    background: url("~assets/images/bg/home-bg-mobile.jpg");
    background-size: 100% 100%;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #262626;
    width: 100%;
    height: 100%;
    mix-blend-mode: hard-light;
  }
  ::placeholder {
    color: #fff;
    text-transform: uppercase;
  }
  &__box {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    min-height: 20vh;
    background: transparent;
    color: #fff;
    padding: 4rem 2rem;
    box-sizing: border-box;
    transition: 0.9s;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
    & .row {
      margin: 0 auto;
      & input {
        border: none;
        outline: none;
        width: 90%;
        padding: 1rem 2rem;
        border-radius: 2.5rem;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.4);
        color: #fff;
        font-size: 1.2rem;
      }
      & .v-icon {
        transform: translateX(-5rem);
      }
      & .form-icon {
        margin: 1rem 0;
      }
      width: 100%;
      margin: 1.5rem 0;
      text-align: center;
    }
    & .row button#signup {
      background: #00bcd4;
      padding: 0.5rem 0;
      border-radius: 2.5rem;
      width: 90%;
      font-size: 1.5rem;
    }
    & .row a {
      font-size: 1.2rem;
      text-decoration: none;
      color: #fff;
      &:hover {
        text-decoration: underline;
      }
    }
    & h2 {
      text-transform: uppercase;
    }
  }
}
</style>
