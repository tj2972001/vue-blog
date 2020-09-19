<template>
  <v-sheet class="overflow-hidden" style="position: relative">
    <NavigationDrawer />
    <v-btn
      outlined
      color="primary"
      fab
      class="ma-2"
      :x-small="$vuetify.breakpoint.xsOnly"
      :small="$vuetify.breakpoint.mdAndUp"
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
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="curPage"
                class="my-4"
                :length="pageCount"
                @input="onPageChange"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-sheet>
</template>
<script>
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import ArticleCard from '@/components/ArticleCard'
import { mapState, mapActions } from 'vuex'

export default {
  watchQuery: true,
  components: {
    NavigationDrawer,
    ArticleCard,
  },
  fetch(ctx) {
    try {
      let categories = []
      const queryStr = ctx.route.query.category
      if (queryStr) {
        if (typeof queryStr === 'string') {
          categories.push(queryStr)
        } else {
          categories = [...queryStr]
        }
      }
      return ctx.store.dispatch('events/fetchArticles', {
        page: ctx.route.query.page || 1,
        limit: ctx.route.query.limit || 3,
        sort: ctx.route.query.sort || '-dateCreated',
        categories,
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
    // allBlogsCount: (state) => state.events.totalArticlesCount,
    allBlogsCountAfterFilter: (state) =>
      state.events.totalArticlesCountAfterFilter,
    curPage: (state) => state.events.curPage,
    curLim: (state) => state.events.curLim,
    pageCount() {
      const x = this.allBlogsCountAfterFilter / this.curLim
      return Math.ceil(x)
    },
  }),
  methods: {
    ...mapActions('events', ['fetchArticles']),
    async onPageChange(e) {
      this.curPage = e
      const categories = []
      if (this.$route.query.category) {
        categories.push('"' + this.$route.query.category + '"')
      }
      await this.fetchArticles({
        page: e,
        limit: this.curLim,
        sort: this.$route.query.sort || '-dateCreated',
        categories,
      })
    },
  },
}
</script>
