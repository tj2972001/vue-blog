<template>
  <v-app style="overflow-x: hidden">
    <NavBar :key="$route.fullPath" />
    <v-main>
      <nuxt :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  watchQuery: true,
};
</script>

<style lang="scss">
@import "/assets/scss/abstracts/variables";
.v-application a {
  text-decoration: none !important;
}
a.nuxt-link-active {
  color: $color-black-pure;
  text-decoration: none;
  margin-top: 0;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: $color-black-pure;
}
</style>
