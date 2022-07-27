<template>
  <v-card elevation="6" outlined class="jobcard-card">
    <v-card-title class="jobcard-card__title"
      >{{ job.jobtype }} - {{ job.title }}</v-card-title
    >
    <v-card-text class="jobcard-card__tags">
      <v-chip v-for="tag in job.categories" :key="tag" class="mr-1">
        {{ tag }}
      </v-chip>
    </v-card-text>
    <v-card-text v-if="job.dateCreated" class="jobcard-card__datePosted"
      >Posted on: {{ job.dateCreated }}</v-card-text
    >
    <v-card-subtitle
      v-if="job.salary > 0"
      class="jobcard-card__salary black--text"
      >Expected CTC: {{ job.salary }} LPA</v-card-subtitle
    >
    <v-divider></v-divider>

    <v-card-text class="jobcard-card__description">{{
      job.description
    }}</v-card-text>

    <v-divider></v-divider>

    <v-card-actions v-if="job.jobLink" class="jobcard-card__actions">
      <a :href="job.jobLink"
        ><button
          class="jobcard-card__actions--apply article__card--read btn-medium btn-teal"
        >
          Apply for job
        </button></a
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.jobcard-card {
  &__title {
    margin-top: 1rem;
    font-weight: 700;
  }
  &__salary {
    color: #000;
  }
}
.v-card__text,
.v-card__title {
  padding-bottom: 0.4rem;
  padding-top: 0.4rem;
}
</style>
