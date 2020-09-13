import EventService from '@/services/EventService'
export const state = () => ({
  articles: [],
  article: '',
})
export const mutations = {
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  SET_ARTICLE(state, article) {
    state.article = article
  },
}
export const actions = {
  async fetchArticles(ctx, { page, limit }) {
    const articles = await EventService.getArticles(page, limit)
    ctx.commit('SET_ARTICLES', articles.data.data.blogs)
  },
  async fetchArticle(ctx, id) {
    const article = await EventService.getArticle(id)
    ctx.commit('SET_ARTICLE', article)
  },
  async createArticle(ctx, formData) {
    await EventService.postArticle(formData)
    // console.log()
    // ctx.commit('SET_ARTICLE', article.data.data.blog)
  },
}
export const getters = {}
