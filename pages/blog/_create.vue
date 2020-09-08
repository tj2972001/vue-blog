<template>
  <div class="create-blog">
    <v-card-title>Create a new blog</v-card-title>
    <v-text-field class="mx-auto" label="Add Title" type="text"></v-text-field>
    <no-ssr>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        @tags-changed="(newTags) => (tags = newTags)"
      />
    </no-ssr>

    <no-ssr placeholder="Loading Your Editor...">
      <vue-editor
        v-model="content"
        placeholder="Write Something..."
      ></vue-editor>
    </no-ssr>

    <v-checkbox
      label="save as draft"
      @click="saveAsDraft = !saveAsDraft"
    ></v-checkbox>
    <v-btn> {{ saveAsDraft ? 'Save as Draft' : 'Post' }} </v-btn>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      content: '',
      pageIsMounted: false,
      isSSR: !!process.server,
    }
  },
  data() {
    return {
      tag: '',
      tags: [],
      saveAsDraft: false,
    }
  },
  // components: { VueEditor },

  methods: {
    reloadWindow() {
      window.location.reload(true)
    },
  },
}
</script>
<style scoped>
.create-blog {
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
}
.create-blog > * {
  margin-top: 25px;
}
</style>
