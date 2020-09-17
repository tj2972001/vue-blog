<template>
  <v-container>
    <v-card width="1000" max-width="85%" class="mx-auto pa-5">
      <v-card-title> {{ article.title }} </v-card-title>
      <v-card-subtitle>By Tejas Jadhav on {{ dateCreated }} </v-card-subtitle>

      <v-card-text style="font-family: sans-serif">
        {{ article.description }}
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-text style="font-family: sans-serif" v-html="article.content">
      </v-card-text>
      <ShareNetwork
        v-for="network in networks"
        :key="network.network"
        :network="network.network"
        :url="`http://localhost:3000/blog/${article._id}`"
        :title="`${article.title}`"
      >
        <v-btn icon>
          <v-icon :color="network.color"> {{ network.icon }} </v-icon>
        </v-btn>
      </ShareNetwork>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  async fetch(ctx) {
    try {
      await ctx.store.dispatch('events/fetchArticle', ctx.params.index)
    } catch (e) {
      ctx.error({
        statusCode: 503,
        message: 'Unable to fetch articles at this time. Please try again.',
      })
    }
  },
  computed: mapState({
    article: (state) => state.events.article,
    dateCreated() {
      return this.article.dateCreated.split('T')[0]
    },
  }),
  data() {
    return {
      networks: [
        {
          network: 'facebook',
          icon: 'mdi-facebook',
          color: '#4267B2',
        },
        {
          network: 'twitter',
          icon: 'mdi-twitter',
          color: '#1DA1F2',
        },
        {
          network: 'email',
          icon: 'mdi-email',
          color: '#333',
        },
        {
          network: 'sms',
          icon: 'mdi-message',
          color: '#e0dd1f',
        },
      ],
    }
  },
}
</script>
