<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto" cols="12" md="6">
        <blockquote class="blockquote">
          <strong>&quot; Giving up is not an option. &quot; </strong
          ><em>- Zlatan Ibrahimovic </em>
        </blockquote></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12" class="text-h4">
        Browse through most popular categories
      </v-col>
      <v-col>
        <v-chip
          v-for="chip in popularCategories"
          :key="chip.label"
          class="ma-2"
          :color="chip.color"
          :to="'/blog/?category=' + chip.category"
        >
          {{ chip.label }}
          <v-icon right>{{ chip.icon }}</v-icon>
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-h4">
        Browse through most popular Courses
      </v-col>
      <v-col class="courses">
        <v-chip
          v-for="chip in popularCourses"
          :key="chip.label"
          class="ma-2"
          outlined
          label
          >{{ chip.label }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row class="mx-auto text-body-1 mt-10">
      <v-col cols="12" class="mx-auto">
        Check all <nuxt-link to="/courses"> Courses</nuxt-link>
      </v-col>
      <v-col cols="12" class="mx-auto">
        Check all <nuxt-link to="/lessons"> Lessons</nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      popularCategories: [
        {
          label: 'Node.js',
          icon: 'mdi-nodejs',
          color: '#308730',
          category: 'node',
        },
        {
          label: 'Vue',
          icon: 'mdi-vuejs',
          color: '#61dc5a',
          category: 'vue',
        },
        {
          label: 'MongoDB',
          icon: 'mdi-leaf',
          color: '#07ff02',
          category: 'mongodb',
        },
        {
          label: 'Vuetify',
          icon: 'mdi-vuetify',
          color: '#34b8e0',
          category: 'vuetify',
        },
        {
          label: 'Football Space (mainly Tottenham)',
          icon: 'mdi-soccer',
          color: '#e5ac4f',
          category: 'football',
        },
        {
          label: 'Personal Experiences',
          icon: 'mdi-cube-outline',
          category: 'personal',
        },
      ],
      popularCourses: [
        {
          label: 'CS101',
        },
        {
          label: 'The Complete SQL Bootcamp 2020: Go from Zero to Hero',
        },
        {
          label: 'Introduction to Vuetify',
        },
        {
          label: 'Database schema design paterns',
        },
        {
          label: 'Advanced Component design',
        },
      ],
    }
  },
}
</script>
