<template>
  <v-app style="overflow-x: hidden">
    <NavBar />
    <v-main>
      <nuxt :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script></script>

<style></style>
