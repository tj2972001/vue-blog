<template>
  <v-card width="85%" max-width="700" class="mx-auto mt-5">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img src="https://randomuser.me/api/portraits/women/70.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          article.title
        }}</v-list-item-title>
        <v-list-item-subtitle
          >by Tejas Jadhav On {{ article.createdAt }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-text v-html="article.content"> </v-card-text>

    <v-card-actions>
      <v-btn text color="deep-purple accent-4"> Read </v-btn>
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
}
</script>
