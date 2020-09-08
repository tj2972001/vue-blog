<template>
  <div>
    <label class="typo__label">Groups</label>
    <multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      group-values="libs"
      group-label="language"
      :group-select="true"
      placeholder="Type to search"
      track-by="name"
      label="name"
      ><span slot="noResult"
        >Oops! No elements found. Consider changing the search query.</span
      ></multiselect
    >
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      options: [
        {
          language: 'Javascript',
          libs: [
            { name: 'Vue.js', category: 'Front-end' },
            { name: 'Adonis', category: 'Backend' },
          ],
        },
        {
          language: 'Ruby',
          libs: [
            { name: 'Rails', category: 'Backend' },
            { name: 'Sinatra', category: 'Backend' },
          ],
        },
        {
          language: 'Other',
          libs: [
            { name: 'Laravel', category: 'Backend' },
            { name: 'Phoenix', category: 'Backend' },
          ],
        },
      ],
      value: [],
    }
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
label {
  font-size: 20px;
}
div {
  font-size: 10px;
}
</style>
