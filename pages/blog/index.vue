<template>
  <section class="blog-page">
    <NavigationDrawer class="blog-page__navigation_drawer" :cats="tags" />
    <div v-if="allBlogs.length == 0" class="blog-page__skeleton-container">
      <v-alert
        width="90%"
        max-width="600px"
        type="info"
        class="blog-page__skeleton-container--alert"
        >Loading articles</v-alert
      >
      <v-skeleton-loader
        v-for="i in 2"
        :key="i"
        class="blog-page__skeleton-container--skeleton"
        width="90%"
        max-width="600px"
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <ArticleCard
      v-for="article in allBlogs"
      :key="article._id"
      :article="article"
      class="blog-page__articles"
    />
    <div class="text-center blog-page__pagination">
      <v-container>
        <v-row justify="center">
          <v-pagination
            v-model="curPage"
            class="my-4"
            :length="pageCount"
            @input="onPageChange"
          ></v-pagination>
        </v-row>
        <v-row justify="center"
          >page: {{ curPage }} out of {{ pageCount }}</v-row
        >
      </v-container>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  watchQuery: true,
  fetch(ctx) {
    try {
      let categories = [];
      console.log("In blog fetch");
      const queryStrCategory = ctx.route.query.category;
      const queryStrDateFrom = ctx.route.query.dateFrom;
      const queryStrDateTo = ctx.route.query.dateTo;
      const queryStrPage = ctx.route.query.page || 1;
      const queryStrLimit = ctx.route.query.limit || 10;
      const queryStrSort = ctx.route.query.sort || "-dateCreated";
      if (queryStrCategory) {
        console.log("queryStrCategory", typeof queryStrCategory);
        if (typeof queryStrCategory === "string") {
          categories.push(queryStrCategory);
        } else {
          categories = [...queryStrCategory];
        }
      }
      ctx.store.dispatch("events/fetchArticles", {
        page: queryStrPage,
        limit: queryStrLimit,
        sort: queryStrSort,
        categories,
        dateFrom: queryStrDateFrom,
        dateTo: queryStrDateTo,
      });
      ctx.store.dispatch("events/fetchTags", {
        page: 0,
        limit: 500000,
      });
    } catch (e) {
      ctx.error({
        statusCode: 503,
        message: "Unable to fetch articles at this time. Please try again.",
      });
    }
  },
  data() {
    return {
      pageTitle: "All articles",
    };
  },
  head() {
    return {
      title: this.pageTitle,
    };
  },
  computed: mapState({
    allBlogs: (state) => state.events.articles,
    allBlogsCount: (state) => state.events.totalArticlesCount,
    curPage: (state) => state.events.curPage,
    curLim: (state) => state.events.curLim,
    pageCount() {
      const x = this.allBlogsCount / this.curLim;
      return Math.ceil(x);
    },
    tags: (state) => state.events.tags,
  }),
  methods: {
    ...mapActions("events", ["fetchArticles"]),
    async onPageChange(e) {
      this.curPage = e;
      const categories = [];
      if (this.$route.query.category) {
        categories.push('"' + this.$route.query.category + '"');
      }
      await this.fetchArticles({
        page: e,
        limit: this.curLim,
        sort: this.$route.query.sort || "-dateCreated",
        categories,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.blog-page {
  &__articles {
    width: 80%;
    margin: 0 auto;
  }
  &__skeleton-container {
    &--skeleton {
      margin: 0 auto;
    }
    &--alert {
      margin: 2rem auto;
    }
  }

  @media only screen and (max-width: 600px) {
    width: 95%;
  }
}
</style>
