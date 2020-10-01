<template>
  <v-sheet>
    <h2 class="textGrd">Your liked articles</h2>
    <ArticleCard
      v-for="article in allBlogs"
      :key="article._id"
      :article="article"
      style="overflow-x: scroll"
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
import ArticleCard from '@/components/ArticleCard'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    ArticleCard,
  },
  watchQuery: true,
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
      return ctx.store.dispatch('events/fetchLikedArticles', {
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
  computed: {
    ...mapState({
      allBlogs: (state) => state.events.articles,
      allBlogsCountAfterFilter: (state) =>
        state.events.totalArticlesCountAfterFilter,
      curPage: (state) => state.events.curPage,
      curLim: (state) => state.events.curLim,
      pageCount() {
        const x = this.allBlogsCountAfterFilter / this.curLim
        return Math.ceil(x)
      },
    }),
  },
  methods: {
    ...mapActions('events', ['fetchLikedArticles']),
    async onPageChange(e) {
      this.curPage = e
      const categories = []
      if (this.$route.query.category) {
        categories.push('"' + this.$route.query.category + '"')
      }
      await this.fetchLikedArticles({
        page: e,
        limit: this.curLim,
        sort: this.$route.query.sort || '-dateCreated',
        categories,
      })
    },
  },
}
</script>

<style></style>
