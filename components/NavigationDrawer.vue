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
            :items="catsArr()"
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
          <nuxt-link :key="`${urlParams.selectedSortBy}`" :to="filterRoute">
            <v-btn color="teal" outlined> Apply </v-btn>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
export default {
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
        selectedSortBy: this.$route.query.sort || "-dateCreated",
        selectedDate: [
          "2020-09-21", // dateCreated of first article in database
          this.formatDate(new Date()), // today's date
        ],
        selectedJobType: "",
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
      let url = `/blog/?sort=${this.urlParams.selectedSortBy}&dateFrom=${this.urlParams.selectedDate[0]}&dateTo=${this.urlParams.selectedDate[1]}`;
      console.log("this.urlParams.selectedCats ", this.urlParams.selectedCats);
      if (this.urlParams.selectedCats.length > 0) {
        for (const selectedCat of this.urlParams.selectedCats) {
          url = url.concat(`&category=${selectedCat}`);
        }
      }
      console.log("url: ", url);
      return url;
    },
  },
  methods: {
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
