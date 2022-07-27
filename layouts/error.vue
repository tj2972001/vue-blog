<template>
  <v-app dark>
    <v-alert v-if="error.statusCode === 404" type="error" dense>
      {{ pageNotFound }}
    </v-alert>
    <v-alert v-else type="error" dense>
      {{ otherError }}
      {{ error.message }}
    </v-alert>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
