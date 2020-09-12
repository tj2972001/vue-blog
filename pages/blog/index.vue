<template>
  <v-sheet height="100vh" class="overflow-hidden" style="position: relative">
    <NavigationDrawer />
    <v-btn
      outlined
      color="primary"
      fab
      class="ma-2"
      :x-small="$vuetify.breakpoint.xsOnly"
      :small="$vuetify.breakpoint.mdAndUp"
      :large="$vuetify.breakpoint.lgAndUp"
      to="/blog/create/"
    >
      <v-icon>mdi-grease-pencil</v-icon>
    </v-btn>
    <h2>Welcome to my blog</h2>
    <ArticleCard />
  </v-sheet>
</template>
<script>
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import ArticleCard from '@/components/ArticleCard'
export default {
  components: {
    NavigationDrawer,
    ArticleCard,
  },
}
</script>
