import EventService from "@/services/EventService";

export const actions = {
  login(ctx, formData) {
    return EventService.login(formData);
  },
  signUp(ctx, formData) {
    return EventService.signup(formData);
  },
  updateUserInfo({ commit }, formData) {
    return EventService.updateUserInfo(formData);
  },
  logOutUser() {
    return EventService.logOut();
  },
  updatePassword(ctx, formData) {
    return EventService.updatePassword(formData);
  },
};
