import EventService from '@/services/EventService'
export const state = () => ({
  articles: [],
  totalArticlesCount: 0,
  totalArticlesCountAfterFilter: 0,
  article: '',
  curPage: 1,
  curLim: 3,
})
export const mutations = {
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  SET_ARTICLE(state, article) {
    state.article = article
  },
  SET_BLOG_COUNT(state, count) {
    state.totalArticlesCount = count
  },
  SET_CUR_PAGE(state, page) {
    state.curPage = page
  },
  SET_CUR_LIM(state, limit) {
    state.curLim = limit
  },
  SET_BLOG_COUNT_AFTER_FILTER(state, count) {
    state.totalArticlesCountAfterFilter = count
  },
}
export const actions = {
  async fetchArticles(ctx, { page, limit, sort, categories }) {
    const articles = await EventService.getArticles(
      page,
      limit,
      sort,
      categories
    )
    ctx.commit('SET_ARTICLES', articles.data.data.blogs)
    ctx.commit('SET_BLOG_COUNT', articles.data.totalBlogsCount)
    ctx.commit('SET_CUR_PAGE', parseInt(page))
    ctx.commit('SET_CUR_LIM', parseInt(limit))
    const count =
      categories.length > 0
        ? articles.data.totalBlogs
        : articles.data.totalBlogsCount
    ctx.commit('SET_BLOG_COUNT_AFTER_FILTER', count)
  },
  async fetchArticle(ctx, id) {
    const article = await EventService.getArticle(id)
    ctx.commit('SET_ARTICLE', article.data.data.blog)
  },
  async createArticle(ctx, formData) {
    await EventService.postArticle(formData)
  },
}
export const getters = {}
