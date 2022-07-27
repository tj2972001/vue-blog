<template>
  <div class="create-job">
    <h2>Post a new job</h2>
    <v-card elevation="20" class="create-job__card">
      <v-form class="create-job__form" @submit.prevent>
        <v-text-field
          v-model="jobForm.title.value"
          :label="jobForm.title.label"
          :rules="jobForm.title.rules"
        ></v-text-field>
        <v-textarea
          v-model="jobForm.description.value"
          :label="jobForm.description.label"
          :rules="jobForm.description.rules"
        ></v-textarea>
        <no-ssr>
          <vue-tags-input
            v-model="jobForm.categories.value"
            :tags="jobForm.categories.values"
            placeholder="add a categories"
            @tags-changed="(newTags) => (jobForm.categories.values = newTags)"
          />
        </no-ssr>
        <v-select
          v-model="jobForm.jobtype.value"
          :label="jobForm.jobtype.label"
          :items="jobForm.jobtype.values"
        ></v-select>
        <v-select
          v-show="
            jobForm.jobtype.value === 'INTERN' ||
            jobForm.jobtype.value === 'FTE_new_grad'
          "
          multiple
          :label="jobForm.eligibleBatches.label"
          :items="jobForm.eligibleBatches.value"
        ></v-select>
        <v-text-field
          v-model="jobForm.salary.value"
          :label="jobForm.salary.label"
          type="number"
          :rules="jobForm.salary.rules"
          single-line
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="jobForm.joblink.value"
          :label="jobForm.joblink.label"
          :rules="jobForm.joblink.rules"
        ></v-text-field>
        <v-card-actions class="justify-center">
          <v-btn type="submit" outlined :block="true" color="teal"> Post</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jobForm: {
        title: {
          value: "",
          rules: [
            (v) =>
              (!!v && v.length > 10 && v.length < 500) ||
              "Name is required with length>10 & length<500 chars",
          ],
          label: "Add a title to job",
        },
        description: {
          value: "",
          rules: [
            (v) => {
              return (
                (!!v && v.length > 10 && v.length < 1000) ||
                "description is required with length>10 & length<500 chars"
              );
            },
          ],
          label: "Add a description to job",
        },
        jobtype: {
          label: "Select a job type",
          values: ["INTERN", "FTE_new_grad", "FTE_regular"],
          value: "",
        },
        eligibleBatches: {
          label: "Select all eligible branches",
          value: this.getEligibleBatches(),
        },
        salary: {
          label: "Enter salary for this job (in LPA)",
          rules: [
            (e) => (!!e && !Number.isNaN(e)) || "Please enter valid number",
          ],
        },
        joblink: {
          label: "Post a link to this job",
          value: "",
          rules: [
            (e) =>
              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
                e
              ) || "Please enter valid link",
          ],
        },
        categories: {
          values: [],
          value: "",
        },
      },
    };
  },
  methods: {
    getEligibleBatches() {
      const currYear = Number(new Date().getFullYear());
      const eligibleBatches = [];
      for (let i = -5; i < 5; i++) {
        eligibleBatches.push((currYear + i).toString());
      }
      return eligibleBatches;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "/assets/scss/abstracts/mixins";
.create-job {
  @include createNew;
  &__form {
    & > * {
      margin-bottom: 2rem;
      padding: 1rem;
    }
  }
  &__card {
    margin: 2rem;
  }
}
</style>
