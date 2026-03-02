<template>
  <section class="about-page">
    <div class="about-page__hero">
      <div class="about-page__hero-content">
        <v-avatar size="160" class="about-page__avatar">
          <v-img src="/tejas.jpg" alt="Tejas" cover></v-img>
        </v-avatar>
        <h1 class="about-page__title">Tejas Jadhav</h1>
        <p class="about-page__subtitle">Aspiring software Engineer</p>
      </div>
    </div>
    <v-container class="about-page__content">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card flat class="about-page__bio pa-6">
            <p class="about-page__bio-text">
              Hello! I'm Tejas, 19 years old, pursuing Computer Science and Engineering
              from Pimpri Chinchwad College of Engineering (PCCOE), Pune.
            </p>
            <p class="about-page__bio-text">
              I enjoy web development, especially server-side with Node and Express.
              I've also learned the Vue.js frontend stack and love building with it.
              When I'm not coding, I like watching football and movies.
            </p>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="about-page__social">
        <v-btn icon href="https://github.com/tj2972001" target="_blank" rel="noopener" color="#333" class="mx-2">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn icon href="https://www.linkedin.com/in/tejas-jadhav-pccoe/" target="_blank" rel="noopener" color="#0A66C2" class="mx-2">
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
        <v-btn icon href="https://www.facebook.com/profile.php?id=100022308631631" target="_blank" rel="noopener" color="#1877F2" class="mx-2">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon href="https://instagram.com/tejas.ttid" target="_blank" rel="noopener" color="#1DA1F2" class="mx-2">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="about-page__resume-section">
        <v-col cols="12" md="10">
          <v-card flat class="pa-6">
            <h2 class="about-page__resume-title mb-4">Resume</h2>
            <div class="about-page__resume-viewer">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=1"
                title="Resume PDF"
                class="about-page__resume-iframe"
              />
            </div>
            <v-btn
              color="primary"
              href="/resume.pdf"
              download="Tejas_Jadhav_Resume.pdf"
              class="mt-4"
              outlined
            >
              <v-icon left>mdi-download</v-icon>
              Download Resume
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "About me",
    };
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
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%);
  padding-bottom: 4rem;
}
.about-page__hero {
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  padding: 4rem 2rem;
  text-align: center;
}
.about-page__hero-content {
  max-width: 600px;
  margin: 0 auto;
}
.about-page__avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
.about-page__title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.25rem;
}
.about-page__subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}
.about-page__content {
  margin-top: -2rem;
}
.about-page__bio {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.about-page__bio-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 1rem;
}
.about-page__bio-text:last-child {
  margin-bottom: 0;
}
.about-page__social {
  margin: 2rem 0;
}
.about-page__resume-section {
  margin-top: 3rem;
}
.about-page__resume-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a237e;
}
.about-page__resume-viewer {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}
.about-page__resume-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 600px) {
  .about-page__hero {
    padding: 3rem 1rem;
  }
  .about-page__title {
    font-size: 1.5rem;
  }
}
</style>
