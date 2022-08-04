<template>
  <v-row class="NavigationDrawer">
    <div class="NavigationDrawer__buttons">
      <v-btn
        color="primary"
        fab
        outlined
        :x-small="$vuetify.breakpoint.smAndDown"
        :small="$vuetify.breakpoint.mdAndUp"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn
        outlined
        color="primary"
        fab
        class="ml-2"
        :x-small="$vuetify.breakpoint.smAndDown"
        :small="$vuetify.breakpoint.mdAndUp"
        to="/job/create/"
      >
        <v-icon>mdi-grease-pencil</v-icon>
      </v-btn>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      :width="$vuetify.breakpoint.smAndDown ? '80vw' : '40vw'"
      app
      right
      temporary
      class="NavigationDrawer__drawer"
    >
      <v-list dense nav class="NavigationDrawer__drawer__list">
        <v-list-item-content class="NavigationDrawer__drawer__list--header">
          <v-list-item-title
            class="NavigationDrawer__drawer__list--header--title"
          >
            Filter
          </v-list-item-title>
        </v-list-item-content>
        <v-divider class="mb-5"></v-divider>
        <v-list-item>
          <v-select
            v-model="urlParams.selectedJobType"
            multiple
            :append-icon="drawerJobType.icon"
            item-text="label"
            item-value="value"
            :items="drawerJobType.jobTypeList"
            :label="drawerJobType.title"
          ></v-select>
        </v-list-item>
        <v-list-item class="NavigationDrawer__drawer__list--items" link>
          <v-select
            v-model="urlParams.selectedSortBy"
            :append-icon="drawerDateSort.icon"
            item-text="name"
            item-value="value"
            :items="drawerDateSort.sortList"
            :label="drawerDateSort.title"
          ></v-select>
        </v-list-item>
        <v-list-item>
          <v-autocomplete
            v-model="urlParams.selectedCats"
            :items="catsArr()"
            small-chips
            append-icon="mdi-tag-multiple-outline"
            label="Select job keywords"
            multiple
          ></v-autocomplete>
        </v-list-item>
        <v-list-item>
          <ol>
            <li v-for="cat in urlParams.selectedCats" :key="cat">
              {{ cat }}
            </li>
          </ol>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="urlParams.selectedEligibleBatches"
            multiple
            :append-icon="drawerEligibleBatches.icon"
            :items="drawerEligibleBatches.eligibleBatches"
            :label="drawerEligibleBatches.title"
          ></v-select>
        </v-list-item>
        <v-list-item>
          selectedEligibleBatches: {{ urlParams.selectedEligibleBatches }}
        </v-list-item>
        <v-list-item>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="urlParams.selectedDate"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="urlParams.selectedDate"
                label="Select by job posted date range"
                append-outer-icon="mdi-calendar"
                color="red"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="urlParams.selectedDate"
              range
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(urlParams.selectedDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-list-item>

        <v-list-item class="NavigationDrawer__drawer__list--applybtn">
          <nuxt-link :key="`${urlParams.selectedJobType}`" :to="filterRoute">
            <v-btn color="teal" outlined> Find jobs </v-btn>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
export default {
  watchQuery: true,
  props: {
    cats: {
      type: Array,
    },
  },
  data() {
    return {
      drawer: null,
      drawerDateSort: {
        title: "Sort By",
        icon: "mdi-sort",
        sortList: [
          {
            name: "Date : Newest First",
            value: "-dateCreated",
          },
          {
            name: "Date : Oldest First",
            value: "dateCreated",
          },
        ],
      },
      drawerJobType: {
        icon: "mdi-briefcase",
        title: "Select job type",
        jobTypeList: [
          {
            label: "Internship",
            value: "INTERN",
          },
          {
            label: "Full-time for freshers",
            value: "FTE-new_grad",
          },
          {
            label: "Full-time",
            value: "FTE-regular",
          },
        ],
      },
      drawerEligibleBatches: {
        icon: "mdi-school",
        title: "Select batches eligible",
        eligibleBatches: this.selectedEligibleBatchesMethod(),
      },
      urlParams: {
        selectedCats: [],
        selectedSortBy: this.$route.query.sort || "-dateCreated",
        selectedDate: [
          undefined, // dateCreated of first job in database
          undefined /* this.formatDate(new Date()) */, // today's date
        ],
        selectedJobType: [],
        selectedEligibleBatches: [],
      },
      menu: false,
      modal: false,

      catsArr() {
        return this.cats.map((e) => e._id);
      },
    };
  },
  computed: {
    filterRoute() {
      const dateFrom = this.urlParams.selectedDate[0];
      const dateTo = this.urlParams.selectedDate[1];
      let url = `/job/?`;
      if (this.urlParams.selectedSortBy) {
        url = url.concat(`&sort=${this.urlParams.selectedSortBy}`);
      }
      if (this.urlParams.selectedCats) {
        if (typeof this.urlParams.selectedCats === "string") {
          url = url.concat(`&category=${this.urlParams.selectedCats}`);
        } else {
          for (const selectedCat of this.urlParams.selectedCats) {
            url = url.concat(`&category=${selectedCat}`);
          }
        }
      }
      if (this.urlParams.selectedJobType) {
        if (typeof this.urlParams.selectedJobType === "string") {
          url = url.concat(`&jobType=${this.urlParams.selectedJobType}`);
        } else {
          for (const selectedJob of this.urlParams.selectedJobType) {
            url = url.concat(`&jobType=${selectedJob}`);
          }
        }
      }
      if (this.urlParams.selectedEligibleBatches) {
        if (typeof this.urlParams.selectedEligibleBatches === "string") {
          url = url.concat(
            `&showByEligibleBatches=${this.urlParams.selectedEligibleBatches}`
          );
        } else {
          for (const selectedEligibleBatches of this.urlParams
            .selectedEligibleBatches) {
            url = url.concat(
              `&showByEligibleBatches=${selectedEligibleBatches}`
            );
          }
        }
      }
      if (dateFrom) {
        url = url.concat(`&dateFrom=${dateFrom}`);
      }
      if (dateTo) {
        url = url.concat(`&dateTo=${dateTo}`);
      }

      console.log("url::: ", url);
      console.log(
        this.urlParams.selectedSortBy,
        this.urlParams.selectedCats,
        this.urlParams.selectedJobType,
        this.urlParams.selectedEligibleBatches,
        dateFrom,
        dateTo
      );
      return url;
    },
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString("en-CA");
    },
    selectedEligibleBatchesMethod() {
      const eligibleBatches = [];
      const currYear = Number(new Date().getFullYear());
      for (let i = -5; i < 5; i++) {
        eligibleBatches.push((currYear + i).toString());
      }
      return eligibleBatches;
    },
    // getDefaultParamsFromArray(param) {
    //   if (!param) return [];
    //   const paramArr = [];
    //   console.log("param: ", param);
    //   console.log("typeof param, ", typeof param);
    //   if (typeof param === "string") {
    //     return param;
    //   } else {
    //     for (const e of param) {
    //       paramArr.push(e);
    //     }
    //     return paramArr;
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.NavigationDrawer {
  margin: 1.5rem;
  @media only screen and (max-width: 600px) {
    margin: 1rem;
  }
  &__drawer {
    &__list {
      &--header {
        &--title {
          font-size: 2rem;
          font-weight: bold;
        }
      }
      &--items {
      }
      &--applybtn {
        button {
          color: #fff;
        }
      }
    }
  }
}
</style>
