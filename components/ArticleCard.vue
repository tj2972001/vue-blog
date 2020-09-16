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
    <v-list-item>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-sheet>
            <v-chip-group column>
              <v-chip v-for="tag in article.categories" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-list-item>
    <v-card-text v-html="article.content"> </v-card-text>

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
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dateCreated() {
      return this.article.dateCreated.split('T')[0]
    },
  },
}
</script>
