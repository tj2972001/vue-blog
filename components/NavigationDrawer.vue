<template>
  <div>
    <v-btn
      color="primary"
      fab
      outlined
      class="ma-2"
      :x-small="$vuetify.breakpoint.xsOnly"
      :small="$vuetify.breakpoint.mdAndUp"
      :large="$vuetify.breakpoint.lgAndUp"
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>
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
            <v-select :items="item.sortList" :label="item.title"></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="pa-2">
          <v-list-item-icon>
            <v-icon>mdi-filter-plus</v-icon>
          </v-list-item-icon>
          <Multiselect />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn color="primary" class="mt-5"> Search </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
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
            'stars : less to high',
            'stars: hight to less',
            'date: oldest first',
            'date: newest first',
          ],
        },
      ],
    }
  },
}
</script>
