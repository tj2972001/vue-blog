<template>
  <div class="create-blog">
    <h2>Create a new blog</h2>
    <v-text-field
      v-model="title"
      class="mx-auto"
      label="Add Title"
      type="text"
      outlined
      clearable
    ></v-text-field>
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
        use-custom-image-handler
        @image-added="handleImageAdded"
      ></vue-editor>
    </no-ssr>
    <v-card-actions>
      <v-btn
        color="indigo lighten-4"
        text
        outlined
        @click="showPreview = !showPreview"
      >
        {{ showPreview ? "hide preview" : "show preview" }} |
        <v-icon>
          {{ showPreview ? "mdi-eye" : "mdi-eye-off" }}
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <div v-show="showPreview" v-html="content"></div>
    <v-divider></v-divider>
    <v-checkbox
      label="save as draft"
      @click="saveAsDraft = !saveAsDraft"
    ></v-checkbox>
    <v-btn color="primary" text outlined @click="postArticle">
      {{ saveAsDraft ? "Save as Draft" : "Post" }}
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { loggedInUserProperties } from "assets/js/objects";

export default {
  asyncData() {
    return {
      content: "",
      pageIsMounted: false,
      isSSR: !!process.server,
    };
  },
  data() {
    return {
      tag: "",
      tags: [],
      title: "",
      saveAsDraft: false,
      showPreview: false,
      author: JSON.parse(
        window.localStorage.getItem(loggedInUserProperties.key)
      ).user,
    };
  },
  computed: {
    dateCreated() {
      return new Date(Date.now());
    },
  },
  methods: {
    ...mapActions("events", ["createArticle"]),
    async postArticle() {
      const tags = this.tags.map((tag) => tag.text);
      const formData = {
        title: this.title,
        categories: tags,
        saveAsDraft: this.saveAsDraft,
        content: this.content,
        dateCreated: this.dateCreated,
        author: this.author,
      };
      try {
        this.$toast.info("Saving article");
        await this.createArticle(formData);
        this.$toast.info("Article Posted Successfully");
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log("handleImageAdded");
      try {
        const formData = new FormData();
        formData.append("photo", file);
        this.$toast.info("Uploading photo");
        const image = await this.$axios({
          url: "/upload/blog",
          method: "POST",
          data: formData,
        });
        Editor.insertEmbed(cursorLocation, "image", image.data.data.image.url);
        resetUploader();
        this.$toast.success("Image uploaded successfully");
      } catch (e) {
        this.$toast.error(e.response.data.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "/assets/scss/abstracts/mixins";

.create-blog {
  @include createNew;
}
.create-blog > * {
  margin-top: 25px;
}
</style>
