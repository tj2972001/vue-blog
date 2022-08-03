import EventService from "@/services/EventService";

export const actions = {
  login(ctx, formData) {
    return EventService.login(formData);
  },
  loginWithGoogle(ctx) {
    return EventService.loginWithGoogle();
  },
  loginWithMicrosoft(ctx) {
    return EventService.loginWithMicrosoft();
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
  verifyEmail(ctx, formData) {
    return EventService.verifyUserEmail();
  },
  forgotPassword(ctx, formData) {
    return EventService.forgotPassword(formData);
  },
  forgotPasswordReset(ctx, formData) {
    return EventService.forgotPasswordReset(formData);
  },
};
