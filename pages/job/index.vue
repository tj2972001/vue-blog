<template>
  <section class="job-page">
    <job-drawer class="job-page__NavigationDrawer" :cats="tags"></job-drawer>
    <v-alert v-if="allJobsCount == 0" dense type="info">
      No Jobs found
    </v-alert>
    <div v-if="allJobs.length == 0" class="job-page__skeleton-container">
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        class="job-page__skeleton-container--skeleton"
        width="90%"
        max-width="600px"
        v-bind="attrs"
        type="card"
      ></v-skeleton-loader>
    </div>
    <job-card
      v-for="job in allJobs"
      :key="job._id"
      class="job-page__jobs"
      :job="job"
    ></job-card>
    <div class="text-center job-page__pagination">
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
    console.log("In job fetch");
    try {
      let categories = [];
      let jobTypes = [];
      let eligibleBatches = [];
      const queryStrPage = ctx.route.query.page || 1;
      const queryStrLimit = ctx.route.query.limit || 3;
      const queryStrSort = ctx.route.query.sort || "-dateCreated";
      const jobType = ctx.route.query.jobType;
      const eligibleBatch = ctx.route.query.showByEligibleBatches;
      const queryStrCategory = ctx.route.query.category;
      const queryStrDateFrom = ctx.route.query.dateFrom;
      const queryStrDateTo = ctx.route.query.dateTo;

      if (jobType) {
        if (typeof jobType === "string") {
          jobTypes.push(jobType);
        } else {
          jobTypes = [...jobType];
        }
      }
      if (eligibleBatch) {
        if (typeof eligibleBatch === "string") {
          eligibleBatches.push(eligibleBatch);
        } else {
          eligibleBatches = [...eligibleBatch];
        }
      }
      if (queryStrCategory) {
        if (typeof queryStrCategory === "string") {
          categories.push(queryStrCategory);
        } else {
          categories = [...queryStrCategory];
        }
      }
      console.log(
        "categories,dateFrom,dateTo,jobTypes,eligibleBatches",
        categories,
        queryStrDateFrom,
        queryStrDateTo,
        jobTypes,
        eligibleBatches
      );
      ctx.store.dispatch("events/fetchJobs", {
        page: queryStrPage,
        limit: queryStrLimit,
        sort: queryStrSort,
        categories,
        dateFrom: queryStrDateFrom,
        dateTo: queryStrDateTo,
        jobTypes,
        eligibleBatches,
      });
      ctx.store.dispatch("events/fetchJobTags", {
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
      pageTitle: "All jobs",
      drawer: null,
    };
  },
  head() {
    return {
      title: this.pageTitle,
    };
  },
  computed: {
    ...mapState({
      allJobs: (state) => state.events.jobs,
      allJobsCount: (state) => state.events.totalJobsCount || -1,
      curPage: (state) => state.events.curJobPage,
      curLim: (state) => state.events.curJobLimit,
      pageCount() {
        const x = this.allJobsCount / this.curLim;
        return Math.ceil(x);
      },
      tags: (state) => state.events.jobTags,
    }),
  },
  methods: {
    ...mapActions("events", ["fetchJobs"]),
    getArrayFromQueryParams(query) {
      const arr = [];
      if (this.$route.query.category) {
        arr.push('"' + query + "'");
      }
      return arr;
    },
    async onPageChange(e) {
      this.curPage = e;
      const categories = this.getArrayFromQueryParams(
        this.$route.query.category
      );
      const jobTypes = this.getArrayFromQueryParams(this.$route.query.jobType);
      const eligibleBatches = this.getArrayFromQueryParams(
        this.$route.query.eligibleBatches
      );
      const dateFrom = this.$route.query.dateFrom;
      const dateTo = this.$route.query.dateTo;
      await this.fetchJobs({
        page: e,
        limit: this.curLim,
        sort: this.$route.query.sort || "-dateCreated",
        categories,
        jobTypes,
        eligibleBatches,
        dateFrom,
        dateTo,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.job-page {
  &__NavigationDrawer {
    margin-top: 10rem;
  }
  &__jobs {
    width: 80%;
    margin: 0 auto;
  }
  &__skeleton-container {
    &--skeleton {
      margin: 0 auto;
    }
  }

  @media only screen and (max-width: 600px) {
    width: 95%;
  }
}
</style>
