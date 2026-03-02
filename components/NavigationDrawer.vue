<template>
  <v-row class="NavigationDrawer">
    <div class="NavigationDrawer__buttons">
      <v-btn
        style="float: left"
        color="primary"
        fab
        outlined
        class="ma-2"
        :x-small="$vuetify.breakpoint.smAndDown"
        :small="$vuetify.breakpoint.mdAndUp"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn
        v-if="isAdmin"
        outlined
        color="primary"
        fab
        class="ma-2"
        :x-small="$vuetify.breakpoint.smAndDown"
        :small="$vuetify.breakpoint.mdAndUp"
        to="/blog/create/"
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
        <v-list-item
          v-for="item in items"
          :key="item.title"
          class="NavigationDrawer__drawer__list--items"
          link
        >
          <v-select
            v-model="urlParams.selectedSortBy"
            :append-icon="item.icon"
            item-text="name"
            item-value="value"
            :items="item.sortList"
            :label="item.title"
          ></v-select>
        </v-list-item>
        <v-list-item>
          <v-autocomplete
            v-model="urlParams.selectedCats"
            :items="catsArr"
            small-chips
            append-icon="mdi-tag-multiple-outline"
            label="Select categories"
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
                label="Select date range"
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
          <v-btn color="teal" outlined @click="onApply">
            Apply
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { syncUser } from "assets/js/mixins";
export default {
  mixins: [syncUser],
  props: {
    cats: {
      type: Array,
    },
  },
  data() {
    return {
      drawer: null,
      items: [
        {
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
      ],
      urlParams: {
        selectedCats: [],
        selectedSortBy: "-dateCreated",
        selectedDate: [
          "2020-09-21",
          this.formatDate(new Date()),
        ],
        selectedJobType: "",
      },
      menu: false,
      modal: false,
    };
  },
  computed: {
    catsArr() {
      const cats = this.cats || [];
      return cats.map((e) => e.tag || e._id).filter(Boolean);
    },
    isAdmin() {
      const user = this.userDetails || (typeof window !== "undefined" && JSON.parse(localStorage.getItem("user") || "null"));
      return user && user.role === "admin";
    },
    filterRoute() {
      const query = {
        sort: this.urlParams.selectedSortBy,
        dateFrom: this.urlParams.selectedDate?.[0],
        dateTo: this.urlParams.selectedDate?.[1],
      };
      if (this.urlParams.selectedCats?.length) {
        query.category = this.urlParams.selectedCats;
      }
      return { path: "/blog/", query };
    },
  },
  mounted() {
    this.syncParamsFromRoute();
  },
  watch: {
    "$route.query"() {
      this.syncParamsFromRoute();
    },
    drawer(val) {
      if (val) {
        this.syncParamsFromRoute();
      }
    },
  },
  methods: {
    onApply() {
      this.drawer = false;
      this.$router.push(this.filterRoute).catch(() => {});
    },
    syncParamsFromRoute() {
      this.urlParams.selectedSortBy = this.$route.query.sort || "-dateCreated";
      const cat = this.$route.query.category;
      this.urlParams.selectedCats = cat
        ? (Array.isArray(cat) ? [...cat] : [cat])
        : [];
      const dateFrom = this.$route.query.dateFrom;
      const dateTo = this.$route.query.dateTo;
      if (dateFrom && dateTo) {
        this.urlParams.selectedDate = [dateFrom, dateTo];
      }
    },
    formatDate(date) {
      return date.toLocaleDateString("en-CA");
    },
  },
};
</script>
<style lang="scss" scoped>
.NavigationDrawer {
  margin: 1.5rem;
  @media only screen and (max-width: 600px) {
    margin: 0.5rem;
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
