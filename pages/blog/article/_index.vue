<template>
  <div class="app-row article">
    <div class="article__card">
      <h2 class="article__card--title">{{ article.title }}</h2>
      <div class="article__card--author">
        <div class="article__card--author__name">
          <v-icon color="#000">mdi-account-circle-outline</v-icon>
          <span>{{ article.author.name }}</span>
        </div>
        <div class="article__card--author__date">{{ time }}</div>
      </div>
      <hr />
      <article
        class="paragraph article__card--content"
        v-html="article.content"
      ></article>
      <hr />
      <div class="article__card--social">
        <div class="article__card--social__likes">
          <v-icon
            @click="likeArticle"
            class="mr-2"
            style="margin-left: 0"
          >{{isLiked?"mdi-thumb-up":"mdi-thumb-up-outline"}}</v-icon>
          <span
            class="article__card--social__likes--count"
            @click="fetchLikesOnArticle"
            >{{ article.claps.length }} likes</span
          >
          <button @click="dialogDelete = !dialogDelete">
            <v-icon>mdi-trash-can</v-icon>
          </button>
        </div>

        <div class="article__card--social__share">
          <span>share on
          </span>
          <ShareNetwork
            v-for="network in networks"
            :key="network.network"
            :network="network.network"
            :url="`${url}/blog/${article._id}`"
            :title="`${article.title}`"
          >
            <v-icon class="ml-2">
              {{ network.icon }}
            </v-icon>
          </ShareNetwork>
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
                    <v-btn v-else x-small icon>Unfollow</v-btn>
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
                style="position: absolute; right: 5%; top: 5%"
                icon
                color="purple"
                @click="showLikesBtn = !showLikesBtn"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-card>
          </v-overlay>
          <v-dialog v-model="dialogDelete" max-width="400">
            <v-card>
              <v-card-title class="text-body"
                >Are you sure about deleting article?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text rounded @click="dialogDelete = false"> NO </v-btn>
                <v-btn text rounded @click="deleteArticle"> YES </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <div id="disqus_thread"></div>
    <script>
      /**
       *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
       *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
      /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
      ;(function () {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
          s = d.createElement('script')
        s.src = 'https://https-tejasjadhav2907-xyz.disqus.com/embed.js'
        s.setAttribute('data-timestamp', +new Date())
        ;(d.head || d.body).appendChild(s)
      })()
    </script>
    <noscript
      >Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript"
        >comments powered by Disqus.</a
      ></noscript
    >
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
export default {
  watchQuery: true,
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
        },
        {
          network: 'twitter',
          icon: 'mdi-twitter',
        },
        {
          network: 'email',
          icon: 'mdi-email',
        },
        {
          network: 'sms',
          icon: 'mdi-message',
        },
      ],
      showLikesBtn: false,
      dialogDelete: false,
    }
  },
  computed: mapState({
    time() {
      const date = new Date(this.article.dateCreated)
      return timeAgo.format(date)
    },
    article: (state) => state.events.article,
    likersList: (state) => state.events.likes,
    dateCreated() {
      return this.article.dateCreated.split('T')[0]
    },
    isLiked(state) {
      if (!state.user.isLoggedIn) {
        return false
      } else if (this.article.claps.includes(state.user.loggedInUser._id)) {
        return true
      }
      return false
    },
    user: (state)=>state.user.loggedInUser,
    isUserLoggedIn : (state)=>state.user.isLoggedIn
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
        if (!this.isUserLoggedIn) {
          this.$toast.info('You need to have account to like an article')
        } else if (this.article.claps.includes(this.user._id)) {
          await this.unClapArticle(this.article._id)
          this.$toast.success('You unliked an article')
        } else {
          await this.clapArticle(this.article._id)
          this.$toast.success('You liiked an article')
        }
      } catch (e) {
        this.$toast.error(
          'Cannot perform this action . Please try after some time'
        )
        this.$toast.error(e.message)
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
<style lang="scss" scoped>
@import '/assets/scss/abstracts/variables';

.article {
  margin-top: 3rem;
  margin-bottom: 3rem;
  svg {
    margin: 4px;
  }
  &__card {
    position: relative;
    &--title {
      font-weight: 600;
      padding-left: 1rem;
    }
    &--author {
      color: $color-grey-dark;
      display: flex;
      padding-left: 1rem;

      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      &__name {
      }
      &__date {
        margin-right: 2rem;
      }
      svg {
        transform: translateY(0.6rem);
      }
    }
    &--content {
      padding-left: 1rem;
      margin-top: 1rem;
    }
    &--social {
      padding-left: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0;
      &__likes {
        display: flex;
        align-items: center;
        cursor: pointer;
        button {
          margin-left: 2rem;
        }
        &--count {
          text-decoration: underline;
        }
      }
      &__share {
        margin-right: 2rem;
      }
    }
    border: 2px solid $color-grey-light;
  }
  border-radius: 2px $color-grey-light;
}
</style>
