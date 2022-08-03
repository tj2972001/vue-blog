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
      <nuxt-link
        v-for="link in links"
        :key="`${link.label}-header-link`"
        :to="link.url"
      >
        <span class="toolbar__desktop--navButtons">{{ link.label }}</span>
      </nuxt-link>
      <v-menu bottom :close-on-click="closeOnClick">
        <template v-slot:activator="{ on, attrs }">
          <span class="toolbar__desktop--navButtons" v-bind="attrs" v-on="on">
            Tools
          </span>
        </template>

        <v-list>
          <v-list-item v-for="tool in toolLinks" :key="tool.label">
            <nuxt-link :to="tool.url">
              <span class="toolbar__desktop--navButtons"
                >{{ tool.label }} <v-icon class="ml-2">{{ tool.icon }}</v-icon>
              </span>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-if="!isLoggedIn">
        <nuxt-link
          v-for="link in authLinks"
          :key="`${link.label}-header-link`"
          :to="link.url"
        >
          <span class="toolbar__desktop--navButtons">{{ link.label }}</span>
        </nuxt-link>
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
      <v-list class="toolbar__drawer--list">
        <v-list-item
          v-for="link in links"
          :key="`${link.label}-header-link`"
          class="toolbar__drawer--list--item"
        >
          <v-icon class="mr-2">{{ link.icon }}</v-icon>
          <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
        </v-list-item>
        <v-list-item
          v-for="tool in toolLinks"
          :key="tool.label"
          class="toolbar__drawer--list--item"
        >
          <v-icon class="mr-2"> {{ tool.icon }}</v-icon>
          <nuxt-link :to="tool.url">{{ tool.label }}</nuxt-link>
        </v-list-item>
        <template v-if="!isLoggedIn">
          <v-list-item
            v-for="link in authLinks"
            :key="`${link.label}-header-link`"
            class="toolbar__drawer--list--item"
          >
            <v-icon class="mr-2">{{ link.icon }}</v-icon>
            <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item
            v-for="link in loggedInUserLinks"
            :key="`${link.label}`"
            class="toolbar__drawer--list--item"
          >
            <v-icon class="mr-2">{{ link.icon }}</v-icon>
            <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
          </v-list-item>
        </template>
      </v-list>
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
    toolLinks: [
      {
        label: "Jobs for freshers",
        url: "/job",
        icon: "mdi-briefcase",
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
      margin-left: 1rem;
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
      padding-left: 1rem;
      list-style: none;
      &--item {
        padding: 0;
        font-size: 1.5rem;
        margin-top: 1rem;
        min-height: 0;
        text-decoration: none;
      }
    }
  }
  &__desktop {
    &--title {
      font-size: 2rem;
      font-family: "Lora", Serif;
      font-weight: 100;
    }
    &--navButtons {
      margin-right: 1rem;
      &:hover {
        color: $color-teal-dark;
        font-weight: 500;
      }
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
.toolbar__desktop--navButtons {
  font-weight: 300;
}
.nuxt-link-exact-active span {
  color: $color-teal-dark;
  font-weight: 500;
  text-decoration: underline;
}
</style>
