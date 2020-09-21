<template>
  <v-container style="width: auto; white-space: nowrap">
    <v-card
      width="1000"
      max-width="95%"
      class="mx-auto pa-1"
      style="overflow-x: scroll"
    >
      <v-card-title class="text-h5 text-sm-h3 textGrd">
        {{ article.title }}
      </v-card-title>
      <v-card-subtitle>By Tejas Jadhav on {{ dateCreated }} </v-card-subtitle>

      <v-card-text>
        {{ article.description }}
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-text
        class="text-xs-body-2 text-md-body-1"
        v-html="article.content"
      >
      </v-card-text>
      <v-card-actions>
        <v-btn icon @click="likeArticle">
          <v-icon :color="isLiked ? 'red' : '#a09a9a'"> mdi-heart </v-icon>
        </v-btn>
        <span v-if="!isLiked">Like</span>
        <span v-else>Unlike</span>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-subtitle> Share this article on social media</v-card-subtitle>
      <ShareNetwork
        v-for="network in networks"
        :key="network.network"
        :network="network.network"
        :url="`${url}/blog/${article._id}`"
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
import { mapState, mapActions } from 'vuex'
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
    isLiked() {
      if (!this.$auth.loggedIn) {
        return false
      } else if (this.article.claps.includes(this.$auth.user._id)) {
        return true
      }
      return false
    },
  }),
  data() {
    return {
      url: process.env.mainUrl,
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
  methods: {
    ...mapActions('events', ['clapArticle']),
    ...mapActions('events', ['unClapArticle']),
    async likeArticle() {
      try {
        if (!this.$auth.loggedIn) {
          this.$toast.info('You need to have account to like an article')
        } else if (this.article.claps.includes(this.$auth.user._id)) {
          await this.unClapArticle(this.article._id)
          this.$toast.success('You unliked an article')
        } else {
          await this.clapArticle(this.article._id)
          this.$toast.success('You liked an article')
        }
      } catch (e) {
        this.$toast.error(
          'Cannot perform this action . Please try after some time'
        )
      }
    },
  },
}
</script>
