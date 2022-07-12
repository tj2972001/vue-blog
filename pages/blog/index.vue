<template>
  <section class="blog-page">
    <NavigationDrawer class="blog-page__navigation_drawer"/>
    <ArticleCard
      v-for="article in allBlogs"
      :key="article._id"
      :article="article"
      class="blog-page__articles"
    />
    <div class="text-center blog-page__pagination">
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
  </section>
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
      let dateFrom,dateTo;
      console.log("In blog fetch")
      console.log(ctx.route.query)
      const queryStrCategory = ctx.route.query.category
      const queryStrDateFrom = ctx.route.query.dateFrom
      const queryStrDateTo = ctx.route.query.dateTo
      if (queryStrCategory) {
        console.log("queryStrCategory")
        if (typeof queryStrCategory === 'string') {
          categories.push(queryStrCategory)
        } else {
          categories = [...queryStrCategory]
        }
      }
      if(queryStrDateFrom){
        if (typeof queryStrDateFrom === 'string') {
          dateFrom = queryStrDateFrom
        } else {
          dateFrom = [...queryStrDateFrom]
        }
      }
      if(queryStrDateTo){
        if (typeof queryStrDateTo === 'string') {
          dateTo = queryStrDateTo
        } else {
          dateTo = [...queryStrDateTo]
        }
      }
      console.log("dateFrom in index.vue")
      console.log("Categories array is ",categories)
      return ctx.store.dispatch('events/fetchArticles', {
        page: ctx.route.query.page || 1,
        limit: ctx.route.query.limit || 3,
        sort: ctx.route.query.sort || '-dateCreated',
        categories,
        dateFrom,
        dateTo
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
    allBlogsCount: (state) => state.events.totalArticlesCount,
    curPage: (state) => state.events.curPage,
    curLim: (state) => state.events.curLim,
    pageCount() {
      const x = this.allBlogsCount / this.curLim
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
<style lang="scss" scoped>

.blog-page {
  &__articles{
    width: 80%;
    margin: 0 auto;

  }

  @media only screen and (max-width: 600px) {
    width: 95%
  }
}


</style>
