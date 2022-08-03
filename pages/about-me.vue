<template>
  <section class="about-page">
    <div class="app-row about-page__info">
      <div class="app-col-2-of-4">
        <img
          src="/tejas.jpg"
          alt=""
          style="border-radius: 50%"
          max-width="80%"
          width="300"
          height="300"
          class="about-page__info--image"
        />
      </div>
      <div class="app-col-2-of-4">
        <p class="paragraph about-page__info--para">
          Hello my name is Tejas and I am 19 years old and currently pursuing
          computer science and Engineering from Pimpri Chinchwad College of
          Engineering (PCCOE),Pune. I like web developement and particularly
          server-side with Node and Express. I also learned frontend Vuejs stack
          and I am loving it. Beside that I also like to watch football games
          and movies
        </p>
      </div>
    </div>
    <div class="app-row about-page__links">
      <v-btn color="#1DA1F2" href="https://twitter.com/tejas_2001" icon
        ><v-icon>mdi-twitter</v-icon></v-btn
      >
      <v-btn color="#333" href="https://github.com/tj2972001" icon
        ><v-icon>mdi-github</v-icon></v-btn
      >
      <v-btn
        color="#4054c4"
        href="https://www.linkedin.com/in/tejas-jadhav-pccoe/"
        icon
        ><v-icon>mdi-linkedin</v-icon></v-btn
      >
      <v-btn
        color="#6774be"
        href="https://www.facebook.com/profile.php?id=100022308631631"
        icon
        ><v-icon>mdi-facebook</v-icon></v-btn
      >
    </div>
    <div class="app-row about-page__resume">
      <div class="app-col-3-of-4">
        <h2>Resume</h2>
        <client-only>
          <button class="btn-medium btn-teal" @click="page++">Next page</button>
          <button class="btn-medium btn-teal" @click="page--">
            Prev. page
          </button>
          <span>page {{ page }} out of {{ pageCount }} </span>
          <pdf
            class="about-page__resume--pdf"
            src="/resume.pdf"
            :page="page"
            @num-pages="pageCount = $event"
          ></pdf>
        </client-only>
        <a href="/relativity.pdf" download
          ><button class="btn-medium btn-teal">Download resume</button></a
        >
      </div>
      <div class="app-col-1-of-4"></div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      pageTitle: "About me",
      page: 1,
      pageCount: 1,
    };
  },
  watch: {
    page() {
      if (this.page > this.pageCount) {
        this.page = 1;
      } else if (this.page < 1) {
        this.page = 1;
      }
    },
  },
  head() {
    return {
      title: this.pageTitle,
    };
  },
};
</script>
<style scoped lang="scss">
.about-page {
  padding-top: 4rem;
  height: 100%;
  background-color: #eee;
  &__info {
    &--image {
    }
    &--para {
      margin-top: 4rem;
    }
  }
  &__links {
    text-align: center;
    margin-bottom: 1rem;
  }
  &__resume {
    &--pdf {
      color: #6774be;
    }
  }
}
</style>
