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
      width="80vw"
      app
      right
      absolute
      temporary
    >
      <v-list dense nav class="py-0">
        <v-list-item class="my-5 px-5">
          <v-list-item-content>
            <v-list-item-title class="title"> Filter </v-list-item-title>
            <v-list-item-subtitle>
              Apply desired filters and then press Search button
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" class="pa-2" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-select
              v-model="selectedItem"
              item-text="name"
              item-value="value"
              :items="item.sortList"
              :label="item.title"
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <p>{{ selectedItem.value }}</p>
        <v-divider></v-divider>
        <v-list-item class="pa-2">
          <v-list-item-icon>
            <v-icon>mdi-filter-plus</v-icon>
          </v-list-item-icon>
          <Multiselect />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <nuxt-link :key="`${selectedItem}`" :to="`/blog/?sort=${selectedItem}`">
            <v-btn color="primary" class="mt-5"> Apply </v-btn>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import Multiselect from '@/components/Multiselect.vue'
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      drawer: null,
      items: [
        {
          title: 'Sort By',
          icon: 'mdi-sort',
          sortList: [
            {
              name: 'Date : Newest First',
              value: '-dateCreated',
            },
            {
              name: 'Date : Oldest First',
              value: 'dateCreated',
            },
          ],
        },
      ],
      selectedItem: this.$route.query.sort || '-dateCreated',
    }
  },
}
</script>
<style lang="scss" scoped>
.NavigationDrawer{
 margin: 1.5rem;
  @media only screen and (max-width: 600px) {
    margin: .5rem;
  }
}
</style>
