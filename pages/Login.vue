<template>
  <section class="login-page">
    <div class="llcontainer">
      <div class="box">
        <h1>Sign In</h1>
        <div class="row">
          <input v-model="email" type="text" placeholder="email" />
        </div>
        <div class="row">
          <input v-model="password" type="password" placeholder="Password" />
        </div>
        <div class="row">
          <button id="login" class="btn-medium" @click="login">Login</button>
        </div>
        <div class="row">
          <a href="#">Forget Password</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    passwordShow: false,
    email: '',
    password: '',
  }),
  methods: {
    async login() {
      const formData = {}
      formData.email = this.email
      formData.password = this.password
      try {
        this.$toast.info('Logging in ')
        const userResponse = await this.$auth.loginWith('local', {
          data: formData,
        })
        const userStatus = userResponse.data.status
        if (userStatus === 'success') {
          this.$toast.success('Login successfully')
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
* {
  padding: 0;
  margin: 0;
  font-family: 'Quicksand', sans-serif;
}
body {
  background: #fff;
}
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
  width: 100%;
  margin: 25px 0;
  text-align: center;
}
.llcontainer .box .row input {
  border: none;
  outline: none;
  width: 100%;
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
.llcontainer .box .row button#login {
  background: #00bcd4;
  padding: 15px 0;
  border-radius: 50px;
  width: 100%;
}
</style>
