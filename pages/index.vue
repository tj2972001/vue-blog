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
    <div class="home-page__topLikedArticles">
      <h3 class="home-page__topLikedArticles--headings">Top liked articles</h3>
      <ol class="home-page__topLikedArticles--list">
        <div  v-for="article in topLikedArticles" :key="article._id">
         <nuxt-link :to="{path:'/blog/article/'+article._id}">
           <li>
             <span>{{article.title}}</span>
           </li>
         </nuxt-link>
        </div>

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
      <h3 class="home-page__skills--headings">My skills</h3>
      <div class="home-page__skills--list">
        <div class="home-page__skills--list--item icon-svg">
          <span>Node.js</span>
          <fa-icon name="brands/node" :scale="svgIconSize" color="#052e17" ></fa-icon>
        </div>
        <div class="home-page__skills--list--item icon-svg">
          <span>Vuejs</span>
          <fa-icon name="brands/vuejs" :scale="svgIconSize" color="#14de54" ></fa-icon>
        </div>
        <div class="home-page__skills--list--item icon-svg">
          <span>Javascript</span>
          <fa-icon name="brands/js" :scale="svgIconSize" color="yellow"></fa-icon>
        </div>
        <div class="home-page__skills--list--item icon-svg">
          <span>Java</span>
          <fa-icon name="brands/java" :scale="svgIconSize" color="orange"></fa-icon>
        </div>
        <div class="home-page__skills--list--item icon-svg">
          <span>CSS3</span>
          <fa-icon name="brands/css3" :scale="svgIconSize" color="pink"></fa-icon>
        </div>
        <div class="home-page__skills--list--item icon-image">
          <span>MongoDB</span>
          <img src="~assets/images/skills/mongodb.png" alt="MongoDB icon">
        </div>
        <div class="home-page__skills--list--item icon-image">
          <span>C++</span>
          <img src="~assets/images/skills/cpp.png" alt="C++ icon">
        </div>
        <div class="home-page__skills--list--item icon-image">
          <span>Postgres</span>
          <img src="~assets/images/skills/pg.png" alt="Postgres icon">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState,mapActions} from 'vuex'
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
  computed:{
    svgIconSize(){
      if(this.$vuetify.breakpoint.smAndDown){
        return 3
      }else{
        return 7
      }
    },
    ...mapState({
      totalTopLikedArticles: (state)=>state.events.totalTopLikedArticles,
      topLikedArticles: (state)=> state.events.topLikedArticles
    }),
  },
  methods:{
    ...mapActions('events',['fetchTopLikedArticles']),
  },
  fetch(ctx) {
    try{
      return ctx.store.dispatch('events/fetchTopLikedArticles', {
        page: ctx.route.query.page || 1,
        limit: ctx.route.query.limit || 3,
        sort: ctx.route.query.sort || 'claps',
        categories:[],
      })
    }catch (e) {
      ctx.error({
        statusCode: 503,
        message: 'Unable to fetch top Liked articles at this time. Please try again.',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/abstracts/_mixins.scss';
@import '/assets/scss/abstracts/variables';
@import '/assets/scss/base/utilities';

@mixin heading{
  text-decoration: underline;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: $color-golden;
  font-weight: 700;
}
@mixin numList{
  font-size: 1.5rem;
  font-weight: 300;
  list-style: decimal;
}
@mixin list{
  font-size: 1.5rem;
  margin-top: 1rem;
  align-items: center;

}
.home-page {
  &__intro {
    font-weight: 900;
    filter:brightness(80%);
    background-attachment: scroll;
    background: linear-gradient(90deg, rgb(0, 0, 0,.1), rgba(0,0,.2)),url('~assets/images/bg/home-bg.jpg');
    @media only screen and (max-width: 600px){
      background: linear-gradient(270deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)),url('~assets/images/bg/home-bg-mobile.jpg');
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
  &__topLikedArticles{
    max-width: 90%;
    & > *{
      margin-left: 1rem;
    }
    &--headings{
     @include heading
    }
    &--list{
      @include numList;
      & li {
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
    & > *{
      margin-left: 1rem;
    }
    &--headings{
      @include heading;
    }
    &--list{
      display: flex;
      justify-content: left;
      justify-items: center;
      flex-wrap: wrap;
      & .icon-image img{
        @media only screen and (max-width: 600px) {
          height: 50px;
          width: auto;
        }
      }
      &--item{
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 2rem;
        & span {
          font-size: 1rem;
          font-weight: 500;
        }
      }

    }
  }
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
.v-application a{
  color: $color-teal-dark;
}
</style>
