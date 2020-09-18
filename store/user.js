import EventService from '@/services/EventService'

export const actions = {
  async signUp(ctx, formData) {
    await EventService.signup(formData)
  },
  async updateUserInfo({ commit }, formData) {
    const user = await EventService.updateUserInfo(formData)
    return user
  },
}
