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
      <v-card-subtitle
        >By {{ article.author.name }} on {{ dateCreated }}
      </v-card-subtitle>

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
        <v-btn rounded text color="secondary" @click="fetchLikesOnArticle"
          ><v-card-subtitle>
            {{ article.claps.length }} likes</v-card-subtitle
          ></v-btn
        >
        <v-overlay :value="showLikesBtn">
          <v-card
            class="mx-auto"
            width="400"
            max-width="90vw"
            max-height="700"
            style="overflow-y: scroll; scroll-behavior: smooth"
            rounded="rounded-0"
            color="#fff"
          >
            <v-card-title
              class="black--text font-weight-medium purple--text justify-center"
              >Likes</v-card-title
            >
            <p
              style="
                height: 1px;
                width: 90%;
                margin-right: auto;
                margin-left: auto;
                background-color: rebeccapurple;
              "
            ></p>
            <v-list color="#fff">
              <v-list-item v-for="liker in likersList" :key="liker._id">
                <v-list-item-icon>
                  <v-btn v-if="1 < 2" x-small color="purple lighten-1">
                    Follow
                  </v-btn>
                  <v-btn x-small v-else icon>Unfollow</v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="black--text text-body-2"
                    v-text="liker.name"
                  ></v-list-item-title
                ></v-list-item-content>
                <v-list-item-avatar size="30"
                  ><v-img :src="`${liker.photo}`"></v-img
                ></v-list-item-avatar>
              </v-list-item>
            </v-list>
            <v-btn
              icon
              style="position: absolute; right: 5%; top: 5%"
              color="purple"
              @click="showLikesBtn = !showLikesBtn"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-card>
        </v-overlay>
        <v-btn icon @click="dialogDelete = !dialogDelete"
          ><v-icon> mdi-trash-can </v-icon></v-btn
        >
        <v-dialog v-model="dialogDelete" max-width="400">
          <v-card>
            <v-card-title class="text-body"
              >Are you sure about deleting article?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialogDelete = false">
                NO
              </v-btn>
              <v-btn color="red darken-1" text @click="deleteArticle">
                YES
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
        message: 'Unable to fetch article at this time. Please try again.',
      })
    }
  },
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
          color: '#1da1f2',
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
      showLikesBtn: false,
      dialogDelete: false,
    }
  },
  computed: mapState({
    article: (state) => state.events.article,
    likersList: (state) => state.events.likes,
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
  methods: {
    ...mapActions('events', [
      'clapArticle',
      'unClapArticle',
      'fetchLikers',
      'deletePost',
    ]),
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
    async fetchLikesOnArticle() {
      try {
        this.showLikesBtn = true
        this.$toast.info('Loading likes on article')
        await this.fetchLikers(this.article._id)
        this.$toast.success('Likes loaded successfully')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
    async deleteArticle() {
      try {
        this.dialogDelete = false
        this.$toast.info('Deleteing post')
        await this.deletePost(this.article._id)
        this.$toast.success('Post deleted successfully')
        this.$router.push('/blog')
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
  },
}
// v-if="$auth.user.following.contains(liker._id)"
</script>
