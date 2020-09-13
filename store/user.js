import EventService from '@/services/EventService'
export const state = () => ({
  user: {},
})
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}
export const actions = {
  async fetchUserByLogin({ commit, error }, formData) {
    const user = await EventService.login(formData)
    commit('SET_USER', user.data.data.user)
  },
  async fetchUserBySignup({ commit, error }, formData) {
    const user = await EventService.signup(formData)
    commit('SET_USER', user.data.data.user)
  },
}
