<template>
  <div class="auth-callback">
    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    <p class="mt-4">Completing sign in...</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EventService from '@/services/EventService';

export default {
  auth: false,
  async mounted() {
    const token = this.$route.query.token;
    const userStr = this.$route.query.user;
    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        this.$store.commit('user/SET_USER', user);
        this.$store.commit('user/SET_IS_LOGGED_IN', true);
        localStorage.setItem('auth_token', token);
        this.$axios.setHeader('Authorization', `Bearer ${token}`);
        this.$toast.success('Signed in successfully');
        this.$router.replace('/');
      } catch (e) {
        this.$toast.error('Sign in failed');
        this.$router.replace('/login');
      }
    } else {
      const error = this.$route.query.error;
      if (error) this.$toast.error(decodeURIComponent(error));
      this.$router.replace('/login');
    }
  },
};
</script>

<style scoped>
.auth-callback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
</style>
