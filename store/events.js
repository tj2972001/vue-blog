import EventService from "@/services/EventService";
export const state = () => ({
  /** Blog states */
  articles: [],
  totalArticlesCount: 0,
  topLikedArticles: [],
  totalTopLikedArticles: 0,
  tags: [],
  article: "",
  curPage: 1,
  curLim: 1,
  likes: [],
  /** Job states */
  jobs: [],
  totalJobsCount: 0,
  curJobPage: 1,
  curJobLimit: 1,
  jobTags: [],
});
export const mutations = {
  /** Blog */
  SET_ARTICLES(state, articles) {
    state.articles = articles;
  },
  SET_TOP_LIKED_ARTICLES(state, articles) {
    state.topLikedArticles = articles;
  },
  SET_TOP_LIKED_ARTICLES_CNT(state, count) {
    state.totalTopLikedArticles = count;
  },
  SET_ARTICLE(state, article) {
    state.article = article;
  },
  SET_BLOG_COUNT(state, count) {
    state.totalArticlesCount = count;
  },
  SET_CUR_PAGE(state, page) {
    state.curPage = page;
  },
  SET_CUR_LIM(state, limit) {
    state.curLim = limit;
  },
  SET_CUR_LIKES(state, usersWhoLiked) {
    state.likes = usersWhoLiked;
  },
  SET_TAGS(state, tags) {
    for (let i = 0; i < tags.length; i++) {
      state.tags[i] = tags[i];
    }
  },
  /** Job */
  SET_JOBS(state, jobs) {
    state.jobs = jobs;
  },
  SET_JOB_COUNT(state, count) {
    state.totalJobsCount = count;
  },
  SET_CUR_JOB_PAGE(state, page) {
    state.curJobPage = page;
  },
  SET_CUR_JOB_LIMIT(state, limit) {
    state.curJobLimit = limit;
  },
  SET_JOB_TAGS(state, tags) {
    state.jobTags = [...tags];
  },
};
export const actions = {
  /** Blog */
  async fetchArticles(
    ctx,
    { page, limit, sort, categories, dateFrom, dateTo }
  ) {
    const articles = await EventService.getArticles(
      page,
      limit,
      sort,
      categories,
      dateFrom,
      dateTo
    );
    console.log(articles);
    ctx.commit("SET_ARTICLES", articles.data.data.blogs);
    ctx.commit("SET_BLOG_COUNT", articles.data.totalBlogsCount);
    ctx.commit("SET_CUR_PAGE", parseInt(page));
    ctx.commit("SET_CUR_LIM", parseInt(limit));
  },
  async fetchTopLikedArticles(
    ctx,
    { page, limit, sort, categories, dateFrom, dateTo }
  ) {
    console.log("Action: fetchTopLikedArticles");
    const articles = await EventService.getArticles(
      page,
      limit,
      sort,
      categories,
      dateFrom,
      dateTo
    );
    console.log("Top 5 liked articles are: ", articles);
    ctx.commit("SET_TOP_LIKED_ARTICLES", articles.data.data.blogs);
    ctx.commit("SET_TOP_LIKED_ARTICLES_CNT", articles.data.totalBlogsCount);
  },
  async fetchArticle(ctx, id) {
    const article = await EventService.getArticle(id);
    ctx.commit("SET_ARTICLE", article.data.data.blog);
  },
  async createArticle(ctx, formData) {
    await EventService.postArticle(formData);
  },
  async clapArticle(ctx, articleId) {
    const article = await EventService.clap(articleId);
    ctx.commit("SET_ARTICLE", article.data.data.post);
    return article;
  },
  async unClapArticle(ctx, articleId) {
    const article = await EventService.unclap(articleId);
    ctx.commit("SET_ARTICLE", article.data.data.post);
    return article;
  },
  async fetchLikers(ctx, articleId) {
    const likes = await EventService.fetchLikesOnPost(articleId);
    ctx.commit("SET_CUR_LIKES", likes.data.data.blog.claps);
    return likes;
  },
  async deletePost(ctx, articleId) {
    const post = await EventService.deleteArticle(articleId);
    return post;
  },
  async fetchTags(ctx, { sort, skip, limit }) {
    const tags = await EventService.getTags(skip, limit, sort);
    console.log("TAGS: ", tags);
    console.log("typeof tags : ", typeof tags);
    console.log(tags.data.tags);
    ctx.commit("SET_TAGS", tags.data.data.tags);
  },
  /** Job */
  async fetchJobs(
    ctx,
    {
      page,
      limit,
      sort,
      categories,
      dateFrom,
      dateTo,
      jobTypes,
      eligibleBatches,
    }
  ) {
    const jobs = await EventService.getJobs(
      page,
      limit,
      sort,
      categories,
      dateFrom,
      dateTo,
      jobTypes,
      eligibleBatches
    );
    console.log("jobs from store ", jobs);
    ctx.commit("SET_JOBS", jobs.data.data.jobs);
    ctx.commit("SET_JOB_COUNT", jobs.data.totalJobsCount);
    ctx.commit("SET_CUR_JOB_PAGE", parseInt(page));
    ctx.commit("SET_CUR_JOB_LIMIT", parseInt(limit));
  },
  async fetchJobTags(ctx, { sort, skip, limit }) {
    const tags = await EventService.getJobTags(skip, limit, sort);
    console.log("TAGS: ", tags);
    console.log("typeof tags : ", typeof tags);
    console.log(tags.data.tags);
    ctx.commit("SET_JOB_TAGS", tags.data.data.tags);
  },
  async createJob(ctx, formData) {
    await EventService.postJob(formData);
  },
};
export const getters = {};
