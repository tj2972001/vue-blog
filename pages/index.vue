<template>
  <section class="home-page">
    <div class="home-page__hero">
      <div class="home-page__hero-overlay"></div>
      <div class="home-page__hero-content">
        <h1 class="home-page__hero-title">
          Hi, I'm Tejas. Welcome to my blog.
        </h1>
        <p class="home-page__hero-subtitle">
          A curious engineer, curator and avid web developer
        </p>
      </div>
    </div>

    <v-container class="home-page__container">
      <v-row>
        <v-col cols="12" md="6">
          <v-card flat class="home-page__card" elevation="0">
            <v-card-title class="home-page__card-title">Top liked articles</v-card-title>
            <v-card-text>
              <v-skeleton-loader v-if="topLikedArticles.length === 0" type="list-item@3"></v-skeleton-loader>
              <v-list v-else dense>
                <v-list-item
                  v-for="article in topLikedArticles"
                  :key="article._id"
                  :to="'/blog/article/' + article._id"
                  nuxt
                  class="px-0"
                >
                  <v-list-item-content>
                    <v-list-item-title class="home-page__list-title">
                      {{ article.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-icon x-small>mdi-hand-back-right</v-icon>
                      {{ (article.claps || []).length }} likes
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat class="home-page__card" elevation="0">
            <v-card-title class="home-page__card-title">Popular tags</v-card-title>
            <v-card-text>
              <v-skeleton-loader v-if="tags.length === 0" type="chip"></v-skeleton-loader>
              <div v-else class="home-page__tags">
                <nuxt-link
                  v-for="tag in tags"
                  :key="tagName(tag)"
                  :to="{ path: '/blog', query: { category: tagName(tag) } }"
                  class="home-page__tag-link"
                >
                  <v-chip
                    outlined
                    small
                    class="ma-1"
                  >
                    {{ tagName(tag) }}
                    <span class="ml-1 grey--text text--darken-1">({{ tag.count }})</span>
                  </v-chip>
                </nuxt-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h2 class="home-page__skills-title">Skills & Technologies</h2>
          <div class="home-page__skills">
            <v-tooltip v-for="skill in skills" :key="skill.name" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  class="home-page__skill-card"
                  elevation="0"
                >
                  <v-card-text class="text-center py-4">
                    <v-icon :color="skill.color" size="40" class="d-block mb-2">
                      {{ skill.icon }}
                    </v-icon>
                    <span class="home-page__skill-name">{{ skill.name }}</span>
                  </v-card-text>
                </v-card>
              </template>
              <span>{{ skill.name }}</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      skills: [
        { name: "Node.js", icon: "mdi-nodejs", color: "#339933" },
        { name: "Vue.js", icon: "mdi-vuejs", color: "#42b883" },
        { name: "JavaScript", icon: "mdi-language-javascript", color: "#f7df1e" },
        { name: "Java", icon: "mdi-language-java", color: "#ed8b00" },
        { name: "CSS", icon: "mdi-language-css3", color: "#264de4" },
        { name: "MongoDB", icon: "mdi-database", color: "#47a248" },
        { name: "C++", icon: "mdi-language-cpp", color: "#00599c" },
        { name: "PostgreSQL", icon: "mdi-elephant", color: "#336791" },
      ],
    };
  },
  computed: {
    ...mapState({
      totalTopLikedArticles: (state) => state.events.totalTopLikedArticles,
      topLikedArticles: (state) => state.events.topLikedArticles,
      tags: (state) => state.events.tags,
    }),
  },
  methods: {
    ...mapActions("events", ["fetchTopLikedArticles", "fetchTags"]),
    tagName(tag) {
      return tag.tag || tag._id || "";
    },
  },
  fetch(ctx) {
    try {
      ctx.store.dispatch("events/fetchTopLikedArticles", {
        page: ctx.route.query.page || 1,
        limit: ctx.route.query.limit || 5,
        sort: ctx.route.query.sort || "-claps",
        categories: [],
      });
      ctx.store.dispatch("events/fetchTags", {
        page: 0,
        limit: 10,
        sort: "-count",
      });
    } catch (e) {
      ctx.error({
        statusCode: 503,
        message: "Unable to fetch content. Please try again.",
      });
    }
  },
};
</script>

<style scoped lang="scss">
.home-page {
  padding-bottom: 4rem;
}
.home-page__hero {
  position: relative;
  background: url("~assets/images/bg/home-bg.jpg");
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem;
  text-align: center;
  color: white;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-page__hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #262626;
  mix-blend-mode: hard-light;
}
.home-page__hero-title {
  font-size: 2.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}
.home-page__hero-subtitle {
  font-size: 1.125rem;
  opacity: 0.95;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}
.home-page__hero-content {
  position: relative;
  z-index: 1;
}
.home-page__container {
  margin-top: -2rem;
  max-width: 1100px;
}
.home-page__card {
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.home-page__card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
  padding-bottom: 0;
}
.home-page__list-title {
  font-weight: 500;
}
.home-page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.home-page__tag-link {
  text-decoration: none;
}
.home-page__skills-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a237e;
  margin: 3rem 0 1.5rem;
}
.home-page__skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}
.home-page__skill-card {
  border-radius: 12px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.home-page__skill-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.home-page__skill-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #424242;
}

@media (max-width: 600px) {
  .home-page__hero {
    background-image: url("~assets/images/bg/home-bg-mobile.jpg");
    background-size: cover;
    padding: 4rem 1rem;
  }
  .home-page__hero-title {
    font-size: 1.5rem;
  }
  .home-page__skills {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
