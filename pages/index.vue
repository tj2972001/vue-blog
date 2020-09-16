<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto" cols="12" md="6">
        <blockquote class="blockquote">
          <strong
            >&quot; Anything that happens in your life was meant to happen. It
            is your destiny. It was my destiny to have the life I have now, and
            I can’t have any regrets. &quot; </strong
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
          color: '#6cf065',
        },
        {
          label: 'Vue',
          icon: 'mdi-vuejs',
          color: '#b6c9b5',
        },
        {
          label: 'Databases',
          icon: 'mdi-database',
        },
        {
          label: 'Vuetify',
          icon: 'mdi-vuetify',
          color: '#34b8e0',
        },
      ],
      popularCourses: [
        {
          label: 'CS101',
        },
        {
          label: 'Introduction to programming through game design',
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
