<template>
  <div>
    <v-app-bar class="hidden-xs-and-down" app color="primary accent-4" dark>
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
    </v-app-bar>
    <v-app-bar app dark color="primary" class="hidden-sm-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"
        ><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon
      >
      <v-toolbar-title class="text-h5">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      undefined
      width="80vw"
      absolute
      temporary
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
  methods: {
    switchMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped></style>
