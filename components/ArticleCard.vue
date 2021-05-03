<template>
  <div class="app-row article">
    <div class="article__card">
      <h2 class="article__card--title">{{ article.title }}</h2>
      <div class="article__card--author">
        <div class="article__card--author__name">
          <fa-icon name="user-circle" scale="2.5"></fa-icon>
          <span>{{ article.author.name }}</span>
        </div>
        <div class="article__card--author__date">{{ time }}</div>
      </div>
      <hr />
      <article
        class="paragraph article__card--content"
        v-html="article.content"
      ></article>
      <nuxt-link :to="articleLink">
        <button class="article__card--read btn-medium btn-teal">
          Read full article
        </button></nuxt-link
      >
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
export default {
  watchQuery: true,
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('auth', ['user']),
    articleLink() {
      return '/blog/article/' + this.article._id
    },
    time() {
      const date = new Date(this.article.dateCreated)
      return timeAgo.format(date)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '/assets/scss/abstracts/variables';

.article {
  > * :not(hr) {
    padding-left: 1rem;
  }
  &__card {
    position: relative;
    &--title {
      font-weight: 600;
    }
    &--author {
      color: $color-grey-dark;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 1rem;
      &__name {
      }
      &__date {
        margin-right: 2rem;
      }
      svg {
        transform: translateY(0.5rem);
      }
    }
    &--content {
      margin-top: 1rem;
      max-height: 20rem;
    }
    &--read {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    border: 2px solid $color-grey-light;
  }
  box-shadow: 0px -15px 30px -15px inset #111;
}
</style>
