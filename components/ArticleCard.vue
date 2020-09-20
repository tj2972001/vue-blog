<template>
  <v-card width="85%" max-width="700" class="mx-auto mt-5">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img src="/tejas.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          article.title
        }}</v-list-item-title>
        <v-list-item-subtitle
          >by Tejas Jadhav On {{ dateCreated }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-show="article.categories.length > 0">
      <v-row>
        <v-col cols="12">
          <v-sheet>
            <v-chip-group column>
              <v-chip
                v-for="tag in article.categories"
                :key="tag"
                :to="`/blog/?category=${tag}`"
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-list-item>
    <v-card-text class="text-xs-h6 text-md-h5" v-html="article.content">
    </v-card-text>

    <v-card-actions>
      <nuxt-link
        :to="{
          name: 'blog-article',
          params: { index: article._id },
        }"
        ><v-btn text color="deep-purple accent-4"> Read </v-btn></nuxt-link
      >
      <v-btn text color="deep-purple accent-4"> Bookmark </v-btn>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-btn icon @click="likeArticle">
          <v-icon :color="isLiked ? 'red' : '#585656'">mdi-heart</v-icon>
        </v-btn>
        <v-overlay :value="overlay1">
          {{ overlay1msg }}
          <v-btn icon @click="overlay1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-overlay>
      </div>
      <div class="text-center">
        <v-btn icon @click="overlay2 = !overlay2">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-overlay :value="overlay2">
          First read this article then share XD
          <v-btn icon @click="overlay2 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-overlay>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  watchQuery: true,
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    overlay1: false,
    overlay2: false,
    overlay1msg: 'You need to have account to like this article',
  }),
  computed: {
    ...mapState('auth', ['user']),
    dateCreated() {
      return this.article.dateCreated.split('T')[0]
    },
    isLiked() {
      if (!this.$auth.loggedIn) {
        return false
      }
      return this.article.claps.includes(this.user._id)
    },
  },
  methods: {
    likeArticle() {
      if (!this.$auth.loggedIn) {
        this.overlay1 = !this.overlay1
      } else {
        this.overlay1msg = 'First read article XD'
        this.overlay1 = !this.overlay1
      }
    },
  },
}
</script>
