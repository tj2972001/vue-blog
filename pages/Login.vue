<template>
  <section class="login-page">
    <div class="login llcontainer">
      <div class="box login__box">
        <h2>Sign In</h2>
        <div class="row">
          <input v-model="email" type="text" placeholder="email" />
        </div>
        <div class="row">
          <input v-model="password" type="password" placeholder="Password" />
        </div>
        <div class="row">
          <button id="login" class="btn-medium" @click="loginMethod">Login</button>
        </div>
        <div class="row">
          <a href="#">Forget Password</a>
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
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions('user', ['login','storeUser']),
    async loginMethod() {
      const formData = {}
      formData.email = this.email
      formData.password = this.password
      try {
        this.$toast.info('Logging in ')
        const response = await this.login(formData)
        console.log("Login: ",response)
        const userStatus = response.data.status
        if (userStatus === 'success') {
          this.$toast.success('Login successfully')
          this.$toast.info('Saving user to Vuex store')
          this.$store.dispatch('user/storeUser',response.data.data.user)
          console.log('Response.data is ',response.data)
          this.$router.push({
            name: 'index',
          })
        }
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');

.login{
  font-size: 2rem;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: url('~assets/images/bg/home-bg.jpg');
  background-size: 100% 100%;
  @media only screen and (max-width: 600px) {
    background: url('~assets/images/bg/home-bg-mobile.jpg');
    background-size: 100% 100%;
  }
  &::before{
      content: '';
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
  &__box{
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
      width: 90vw;
    }
    & .row{
      & input{
        border: none;
        outline: none;
        width: 100%;
        padding: 1rem 2rem;
        border-radius: 2.5rem;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.4);
        color: #fff;
        font-size: 1.2rem;
      }
      width: 100%;
      margin: 1.5rem 0;
      text-align: center;
    }
    & .row button#login{
      background: #00bcd4;
      padding: .5rem 0;
      border-radius: 5rem;
      width: 100%;
      font-size: 1.5rem;
    }
    & .row a{
      font-size: 1.2rem;
      text-decoration: none;
      color: #fff;
      &:hover{
        text-decoration: underline;
      }
    }
    & h2{
      text-transform: uppercase;
    }
  }
}

</style>
