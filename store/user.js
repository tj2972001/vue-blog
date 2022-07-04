import EventService from '@/services/EventService'
export const state = {
  isLoggedIn: false,
  loggedInUser: null
}
export const mutations = {
  SET_USER(state,user){
    state.isLoggedIn = true
    state.loggedInUser = user
  },
  REMOVE_USER(state){
    state.isLoggedIn = false
    state.loggedInUser = null
  }
}

export const actions = {
  async login(ctx,formData){
    return EventService.login(formData);
  },
  async signUp(ctx, formData) {
    return EventService.signup(formData);
  },
  async updateUserInfo({ commit }, formData) {
    return EventService.updateUserInfo(formData);
  },
  async logOutUser() {
    return EventService.logOut();
  },
  async updatePassword(ctx, formData) {
    return  EventService.updatePassword(formData)
  },
  async storeUser(ctx,user){
    ctx.commit('SET_USER',user)
  },
  async removeUser(ctx){
    ctx.commit('REMOVE_USER')
  }
}
