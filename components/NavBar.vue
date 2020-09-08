<template>
  <v-app-bar app color="primary accent-4" dark>
    <v-toolbar-title>Tejas's blog</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="link in links"
      :key="`${link.label}-header-link`"
      text
      :to="link.url"
      rounded
      >{{ link.label }}</v-btn
    >
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title @click="switchMode">
            Switch to
            {{ $vuetify.theme.dark ? 'light' : 'dark' }}
            mode
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
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
        label: 'About Me',
        url: '/about-me',
      },
    ],
  }),
  methods: {
    switchMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
