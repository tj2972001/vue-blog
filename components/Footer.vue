<template>
  <v-footer class="mt-10" color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.label"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>

      <v-col class="primary lighten-1 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Tejas's Blog</strong>
      </v-col>
      <v-col class="primary lighten-1 py-4 text-center white--text" cols="12">
        Made by
        <a href="https://twitter.com/tejas_2001" style="color: #fff">Tejas</a>
        with <v-icon color="red">mdi-heart</v-icon> and
        <v-icon>mdi-vuejs</v-icon><v-divider vertical></v-divider>
        <v-icon>mdi-vuetify</v-icon><v-divider vertical></v-divider>
        <v-icon>mdi-nuxt</v-icon><v-divider vertical></v-divider>
        <v-icon>mdi-nodejs</v-icon><v-spacer></v-spacer>
      </v-col>
      <v-col class="primary lighten-1 py-4 text-center white--text" cols="12"
        >Checkout source code
        <v-btn
          icon
          href="https://github.com/tj2972001/vue-blog/tree/21-sept-working"
          ><v-icon>mdi-github</v-icon></v-btn
        ></v-col
      >
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Blog',
          url: '/blog',
        },
        {
          label: 'About me',
          url: '/about-me',
        },
        {
          label: 'Login',
          url: '/login',
        },
        {
          label: 'Signup',
          url: '/signup',
        },
      ],
    }
  },
}
</script>
