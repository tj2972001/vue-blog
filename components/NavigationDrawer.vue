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
      :width="$vuetify.breakpoint.smAndDown?'80vw':'40vw'"
      app
      right
      temporary
      class="NavigationDrawer__drawer"
    >
      <v-list dense nav class="NavigationDrawer__drawer__list">
        <v-list-item-content class="NavigationDrawer__drawer__list--header">
            <v-list-item-title class="NavigationDrawer__drawer__list--header--title"> Filter </v-list-item-title>
          </v-list-item-content>
        <v-divider class="mb-5"></v-divider>
          <v-list-item v-for="item in items" :key="item.title" class="NavigationDrawer__drawer__list--items" link>
              <v-select
                v-model="selectedItem"
                :append-icon="item.icon"
                item-text="name"
                item-value="value"
                style="font-size: 1.2rem"
                :items="item.sortList"
                :label="item.title"
              ></v-select>
          </v-list-item>
          <v-list-item class="mb-5">
            <v-icon class="mx-2">mdi-tag-multiple-outline</v-icon>
            <Multiselect />
          </v-list-item >
          <v-list-item class="mb-5">
          <v-icon class="mx-2">mdi-calendar-range-outline</v-icon>
          <DatePicker v-model="selectedDate" range lang="en"/>
        </v-list-item >
          <v-list-item class="mb-5">
          <nuxt-link :key="`${selectedItem}`" :to="`/blog/?sort=${selectedItem}`">
            <button class="btn-medium btn-teal" > Apply </button>
          </nuxt-link>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import Multiselect from '@/components/Multiselect.vue'
import VueDatePickerUI from "vue-datepicker-ui";
import 'vue-datepicker-ui/lib/vuedatepickerui.css';

export default {
  components: {
    Multiselect,
    DatePicker: VueDatePickerUI
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
      selectedDate: [
        new Date(),
        new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)
      ]
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
  &__drawer{
    &__list{
      &--header{
        &--title{
          font-size: 2rem;
          font-weight: bold;
        }
        &--subtitle{
          font-size: 1.2rem;
        }
      }

      &--items{
        & input{
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
