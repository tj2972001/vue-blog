<template>
  <section class="home-page">
    <div class="home-page__intro absolute-center">
      <div class="home-page__intro--container">
        <div class="home-page__intro--container__heading">
          Hi, my name is Tejas <br />
          welcome to my blog.
        </div>
        <div class="home-page__intro--container__about">
          A curious engineer, curator and avid web developer.<br />
          A great fan of Java technologies
        </div>
      </div>
    </div>
    <div class="app-row home-page__categories">
      <h2 class="home-page__categories--heading blueishLinearGrad">
        Read the articles by topic
      </h2>
      <ul class="home-page__categories--list noBullets">
        <li v-for="cat in popularCategories" :key="cat.label">
          <span>{{ cat.label }}</span> <v-icon x-large>{{ cat.icon }}</v-icon>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      popularCategories: [
        {
          label: 'Node.js',
          icon: 'mdi-nodejs',
          color: '#308730',
          category: 'node',
        },
        {
          label: 'Vue',
          icon: 'mdi-vuejs',
          color: '#61dc5a',
          category: 'vue',
        },
        {
          label: 'Spring',
          icon: 'mdi-leaf',
          color: '#07ff02',
          category: 'spring',
        },
        {
          label: 'Vuetify',
          icon: 'mdi-vuetify',
          color: '#34b8e0',
          category: 'vuetify',
        },
        {
          label: 'Football Space (mainly Tottenham)',
          icon: 'mdi-soccer',
          color: '#e5ac4f',
          category: 'football',
        },
        {
          label: 'Personal Experiences',
          icon: 'mdi-cube-outline',
          category: 'personal',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/abstracts/_mixins.scss';
@import '/assets/scss/abstracts/variables';
@import '/assets/scss/base/utilities';

.home-page {
  &__intro {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
      url('~assets/images/home-bg.jpg');
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-color: darken($color: #000000, $amount: 0);
    &--container {
      position: absolute;
      top: 10%;
      left: 60%;
      max-width: 100%;
      color: $color-grey-light;
      width: 60%;

      &__heading {
        line-height: 95%;
        font-size: 2.5rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      &__about {
        margin-top: 1rem;
        font-size: 1.2rem;
        word-wrap: break-word;
      }
    }
  }
  &__categories {
    &--headings {
    }
    &--list {
      li {
        border-radius: 0.5rem;
        margin: 1rem;
        display: flex;
        font-size: 1.2rem;
        font-weight: 300;
        justify-content: space-between;
        width: 100%;
        display: flex;
        height: max-content;
        padding: 1.5rem;
        background-color: $color-grey-light;
      }
    }
  }
}
</style>
