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
    <ArticleCard
      v-for="article in allBlogs"
      :key="article._id"
      :article="article"
    />
  </v-sheet>
</template>
<script>
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import ArticleCard from '@/components/ArticleCard'
import { mapState } from 'vuex'
export default {
  components: {
    NavigationDrawer,
    ArticleCard,
  },
  fetch(ctx) {
    try {
      return ctx.store.dispatch('events/fetchArticles', {
        page: 1,
        limit: 10,
      })
    } catch (e) {
      ctx.error({
        statusCode: 503,
        message: 'Unable to fetch articles at this time. Please try again.',
      })
    }
  },
  computed: mapState({
    allBlogs: (state) => state.events.articles,
  }),
}
</script>
