<template>
  <div>
    <v-app-bar
      v-show="$vuetify.breakpoint.smAndUp"
      app
      color="primary accent-4"
      dark
    >
      <v-toolbar-title class="text-h5">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        :to="link.url"
        rounded
        >{{ link.label }}</v-btn
      >
      <template v-if="!$auth.loggedIn">
        <v-btn
          v-for="link in authLinks"
          :key="`${link.label}-header-link`"
          text
          :to="link.url"
          rounded
          >{{ link.label }}</v-btn
        >
      </template>
      <template v-else>
        <nuxt-link to="/profile"
          ><v-avatar size="30">
            <v-img :src="this.$auth.user.photo"></v-img> </v-avatar
        ></nuxt-link>
      </template>
    </v-app-bar>
    <v-toolbar v-show="$vuetify.breakpoint.xsOnly" dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Tejas's Blog</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      id="drawer"
      v-model="drawer"
      temporary
      absolute
      width="200"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> {{ title }} </v-list-item-title>
          <v-list-item-subtitle> Navigate to </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="link in links"
            :key="`${link.label}-header-link`"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-if="!$auth.loggedIn">
            <v-list-item
              v-for="link in authLinks"
              :key="`${link.label}-header-link`"
              :to="link.url"
            >
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ link.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item v-else to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-emoticon-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Your profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    title: "Tejas's Blog",
    links: [
      {
        label: 'Home',
        url: '/',
        icon: 'mdi-home',
      },
      {
        label: 'Blog',
        url: '/blog',
        icon: 'mdi-blogger',
      },
      {
        label: 'About Me',
        url: '/about-me',
        icon: 'mdi-face',
      },
    ],
    authLinks: [
      {
        label: 'Login',
        url: '/login',
        icon: 'mdi-login',
      },
      {
        label: 'Signup',
        url: '/signup',
        icon: 'mdi-fountain-pen-tip',
      },
    ],
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style scoped></style>
