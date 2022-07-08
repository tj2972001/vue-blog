<template>
  <section class="home-page">
    <div class="home-page__intro">
      <div class="home-page__intro--container">
        <h2 class="home-page__intro--container__heading">
          Hi, my name is Tejas. Welcome to my blog.
        </h2>
        <div class="home-page__intro--container__about">
          A curious engineer, curator and avid web developer.<br />
          A great fan of Java technologies
        </div>
      </div>
    </div>
    <div class="home-page__recentArticles">
      <h3 class="home-page__recentArticles--headings">Recent articles</h3>
      <ol class="home-page__recentArticles--list">
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est laudantium magni odit officia reprehenderit repudiandae saepe tempore. Asperiores aut doloremque ducimus eius ipsa ipsum iusto provident quos voluptatem voluptatum. Amet.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores, assumenda, cumque, delectus dignissimos facilis illo in incidunt molestiae necessitatibus odio pariatur quas quibusdam rem repellat soluta suscipit voluptate voluptatum!</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis ducimus expedita facilis hic ipsa, ipsam ipsum maiores, nam nesciunt nihil non nostrum placeat porro provident quaerat quidem tenetur veniam, voluptates?</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi deleniti dolor, dolorem doloribus ducimus eum excepturi maxime natus nemo nisi nulla, odio officiis pariatur suscipit voluptas, voluptatum. Molestiae, quos.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ducimus iure maxime molestiae nam provident quas voluptatum? Accusantium alias doloremque illo ipsum obcaecati, pariatur ratione, reprehenderit repudiandae ullam vero voluptates.</li>
      </ol>
    </div>
    <div class="home-page__popularTags">
      <h3 class="home-page__popularTags--headings">
        Most popular tags
      </h3>
      <div class="home-page__popularTags--list">
        <ol>
          <li>Vuejs</li>
          <li>Nodejs</li>
          <li>Football</li>
          <li>Personal</li>
          <li>Security</li>
        </ol>
      </div>
    </div>
    <div class="home-page__skills">
      <h3>My skills</h3>
      <div>
        <Icon name="brands/node" scale="5"></Icon>
      </div>
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

@mixin heading{
  text-decoration: underline;
  margin-top: 2rem;
  font-size: 3rem;
  color: $color-golden;
  font-weight: 700;
}
@mixin numList{
  font-size: 1.5rem;
  font-weight: 500;
  list-style: decimal;
}
@mixin list{
  font-size: 1.5rem;
  margin-top: 1rem;
}
.home-page {
  &__intro {
    font-weight: 900;
    filter:brightness(80%);
    background-attachment: scroll;
    background: linear-gradient(90deg, rgb(0, 0, 0,.1), rgba(0,0,.2)),url('~assets/images/home-bg.jpg');
    @media only screen and (max-width: 600px){
      background: linear-gradient(270deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)),url('~assets/images/home-bg-mobile.jpg');
      background-size: 100% 100%;
    }
    height: 120vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    &--container {
      position: absolute;
      top: 10%;
      left: 40%;
      max-width: 100%;
      color: $color-grey-light;
      width: 60%;
      @media only screen and (max-width: 600px) {
        top:5%;
      }
      &__heading {
        color: $color-golden;
        position: relative;
        font-size: 3rem;
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        border-right: .15em solid orange; /* The typwriter cursor */
        margin-right:.2rem; /* Gives that scrolling effect as the typing happens */
        white-space: nowrap;
        animation:
          typing 3.5s steps(40, end),
          blink-caret .75s step-end infinite;
        @media only screen and (max-width: 600px) {
          font-size: 4rem;
          animation: none;
          white-space: normal;
        }
      }
      &__about {
        margin-top: 1rem;
        font-size: 1.5rem;
        word-wrap: break-word;
      }
    }
  }
  &__recentArticles{
    & > *{
      margin-left: 1rem;
    }
    &--headings{
     @include heading
    }
    &--list{
      @include numList;
      & li{
        @include list;
      }
    }
  }
  &__popularTags{
    & > *{
      margin-left: 1rem;
    }
    &--headings{
      @include heading;
    }
    &--list{
      @include numList;
      & li{
        @include list;
      }
    }
  }
  &__skills{

  }
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
</style>
