<template>
  <div class="toolbar">
    <v-app-bar
      v-show="$vuetify.breakpoint.smAndUp"
      app
      class="toolbar__desktop"
    >
      <nuxt-link to="/"
        ><h2 class="toolbar__desktop--title">{{ title }}</h2></nuxt-link
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
        <nuxt-link to="/profile">
          <v-icon>mdi-cog</v-icon>
        </nuxt-link>
      </template>
    </v-app-bar>
    <v-app-bar v-show="$vuetify.breakpoint.xsOnly" class="toolbar__mobile">
      <v-app-bar-nav-icon
        class="toolbar__mobile--icon"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <h2 class="toolbar__mobile--title">{{ title }}</h2>
    </v-app-bar>
    <v-navigation-drawer
      id="drawer"
      v-model="drawer"
      absolute
      class="toolbar__drawer"
      width="70%"
    >
      <v-list-item class="toolbar__drawer--header">
        <v-list-item-content>
          <v-list-item-title class="toolbar__drawer--header--title">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="toolbar__drawer--header--subtitle"
            style="white-space: break-spaces"
          >
            Navigate to
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      isLoggedIn: {{ isLoggedIn }}
      <ul class="toolbar__drawer--list">
        <li v-for="link in links" :key="`${link.label}-header-link`">
          <v-icon class="mr-2">{{ link.icon }}</v-icon>
          <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
        </li>
        <template v-if="!isLoggedIn">
          <li v-for="link in authLinks" :key="`${link.label}-header-link`">
            <v-icon class="mr-2">{{ link.icon }}</v-icon>
            <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
          </li>
        </template>
        <template v-else>
          <li v-for="link in loggedInUserLinks" :key="`${link.label}`">
            <v-icon class="mr-2">{{ link.icon }}</v-icon>
            <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
          </li>
        </template>
      </ul>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { loggedInUserProperties } from "assets/js/objects";
import { checkAndParseLocalStorageStr } from "assets/js/helper";

export default {
  data: () => ({
    drawer: false,
    group: null,
    title: "<tejas.codes/>",
    links: [
      {
        label: "Home",
        url: "/",
        icon: "mdi-home",
      },
      {
        label: "Blog",
        url: "/blog",
        icon: "mdi-notebook-outline",
      },
      {
        label: "About Me",
        url: "/about-me",
        icon: "mdi-badge-account-horizontal-outline",
      },
    ],
    authLinks: [
      {
        label: "Login",
        url: "/login",
        icon: "mdi-login",
      },
      {
        label: "Signup",
        url: "/signup",
        icon: "mdi-account",
      },
    ],
    loggedInUserLinks: [
      {
        label: "Your account",
        url: "/profile",
        icon: "mdi-account",
      },
    ],
    user: checkAndParseLocalStorageStr(
      loggedInUserProperties.key,
      loggedInUserProperties.val
    ).user,
    isLoggedIn: checkAndParseLocalStorageStr(
      loggedInUserProperties.key,
      loggedInUserProperties.val
    ).isLoggedIn,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/abstracts/variables";
.v-application a {
  color: $color-grey-dark;
}
.toolbar {
  &__drawer {
    &--header {
      &--title {
        font-family: "Lora", serif;
        font-size: 2rem;
        font-weight: bold;
      }
      &--subtitle {
        font-size: 1.5rem;
      }
    }
    &--list {
      margin-top: 2rem;
      padding-left: 1rem !important;
      list-style: none;
      & li {
        font-size: 1.5rem;
        text-decoration: none !important;
        margin: 1rem 0;
      }
    }
  }
  &__desktop {
    &--title {
      font-size: 2rem;
      font-family: "Lora", Serif;
      font-weight: 100;
    }
  }
  &__mobile {
    &--title {
      font-size: 1.5rem;
      font-family: "Lora", Serif;
      font-weight: 200;
    }
  }
}
</style>
