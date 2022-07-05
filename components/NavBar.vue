<template>
  <div class="toolbar">
    <v-app-bar v-show="$vuetify.breakpoint.smAndUp" app class="toolbar__desktop">
      <nuxt-link to="/"
        ><h2 class="toolbar__desktop--title">{{
          title
        }}</h2></nuxt-link
      >
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        :to="link.url"
        rounded
        >{{ link.label }}</v-btn
      >
      <template v-if="!isLoggedIn">
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
          ><fa-icon color="#000" name="cog"></fa-icon
        ></nuxt-link>
      </template>
    </v-app-bar>
    <v-app-bar v-show="$vuetify.breakpoint.xsOnly" class="toolbar__mobile">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="toolbar__mobile--icon"></v-app-bar-nav-icon>
      <h2 class="toolbar__mobile--title">{{title}}</h2>
    </v-app-bar>
    <v-navigation-drawer
      id="drawer"
      v-model="drawer"
      temporary
      absolute
      width="70%"
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

          <template v-if="!isLoggedIn">
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
import {mapState} from 'vuex'
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
  computed:{
    ...mapState({
      isLoggedIn: (state)=>state.user.isLoggedIn
    })
  }
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/abstracts/variables";
.toolbar{
  font-weight: bolder;
  font-size: 2rem;
}

</style>
