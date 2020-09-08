<template>
  <v-sheet height="100vh" class="overflow-hidden" style="position: relative">
    <v-btn
      outlined
      fab
      color="indigo"
      class="ma-2"
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      width="60vw"
      app
      right
      absolute
      temporary
    >
      <v-list dense nav class="py-0">
        <v-list-item class="my-5 filter"> Filter </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-select :items="item.sortList" :label="item.title"></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-filter-plus</v-icon>
          </v-list-item-icon>
          <Multiselect />
        </v-list-item>
        <v-list-item class="px-0 text-h6 my-5">
          Press search to get results
        </v-list-item>
        <v-list-item>
          <v-btn> Search </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-btn outlined fab color="indigo" class="ma-2" to="/blog/create/">
      <v-icon>mdi-grease-pencil</v-icon>
    </v-btn>
    <h2>Welcome to my blog</h2>
  </v-sheet>
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
