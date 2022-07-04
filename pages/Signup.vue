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
    <div class="llcontainer">
      <div class="box">
        <h1>Sign Up</h1>
        <div class="row">
          <input v-model="name" type="text" placeholder="Enter name" />
          <span
            ><fa-icon
              class="form-icon"
              scale="1.6"
              name="regular/user-circle"
            ></fa-icon
          ></span>
        </div>
        <div class="row">
          <input
            v-model="email"
            type="email"
            scale="1.6"
            placeholder="Enter email"
          />
          <span
            ><fa-icon
              scale="1.6"
              class="form-icon"
              name="regular/envelope-open"
            ></fa-icon
          ></span>
        </div>
        <div class="row">
          <input
            v-model="password"
            :type="passwordShow ? 'text' : 'password'"
            placeholder="Enter password"
            @click:append="passwordShow = !passwordShow"
          />
          <span
            ><fa-icon scale="1.2" class="form-icon" name="key"></fa-icon
          ></span>
        </div>
        <div class="row">
          <input
            v-model="passwordConfirm"
            :type="passwordConfirmShow ? 'text' : 'password'"
            placeholder="Confirm password"
            @click:append="passwordConfirmShow = !passwordConfirmShow"
          />
          <span
            ><fa-icon scale="1.6" class="form-icon" name="regular/eye"></fa-icon
          ></span>
        </div>
        <div class="row">
          <button id="signup" class="btn-medium" @click="signupMethod">Signup</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
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
    ...mapActions('user', ['signUp']),
    async signupMethod() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      }
      try {
        this.$toast.info('Hold on ! Signing you up')
        await this.signUp(formData)
        this.$toast.success('Successfully Created account ')
        this.$toast.info('Now you can Login', {
          duration: 10000,
        })
        await this.$router.push({ name: 'Login' })
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
  },
}
</script>

<style scoped>
.llcontainer {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: url('~assets/images/home-bg.jpg');
  background-size: 100% 100%;
}
.llcontainer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  background: #262626;
  width: 100%;
  height: 100%;
  mix-blend-mode: hard-light;
}
.llcontainer .box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-height: 10vh;
  background: transparent;
  color: #fff;
  padding: 50px 20px;
  box-sizing: border-box;
  transition: 0.9s;
}
.llcontainer .box h1 {
  font-size: 40px;
  text-align: center;
  text-transform: uppercase;
}
.llcontainer .box .row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 25px 0;
}
.llcontainer .box .row input {
  border: none;
  outline: none;
  width: 95%;
  padding: 13px 25px;
  border-radius: 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.4);
  color: #fff;
  font-size: 18px;
}
::placeholder {
  color: #fff;
  text-transform: uppercase;
}
.llcontainer .box .row a {
  display: inline-block;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
}
.llcontainer .box .row button#signup {
  background: #00bcd4;
  padding: 15px 0;
  border-radius: 50px;
  width: 95%;
}
</style>
