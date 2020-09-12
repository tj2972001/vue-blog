<template>
  <v-card width="85%" max-width="700" class="mx-auto mt-5">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img src="https://randomuser.me/api/portraits/women/70.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >Our Changing Planet</v-list-item-title
        >
        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
      Visit ten places on our planet that are undergoing the biggest changes
      today.
    </v-card-text>

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
