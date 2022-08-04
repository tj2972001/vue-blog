import EventService from "@/services/EventService";
import { setLocalStorage } from "@/assets/js/helper";

export const state = () => ({
  /** Blog states */
  isLoggedIn: false,
  userDetails: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.userDetails = user;
    console.log("SETTING LOCAL STORAGE WITH KEY USER");
    setLocalStorage("user", user);
  },
  SET_IS_LOGGED_IN(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
    setLocalStorage("isLoggedIn", isLoggedIn);
  },
};

export const actions = {
  async login(ctx, formData) {
    // store user -> format is createSendTOken
    const response = await EventService.login(formData);
    const user = response.data.data.user;
    ctx.commit("SET_USER", user);
    ctx.commit("SET_IS_LOGGED_IN", true);
    return response;
  },
  async loginWithGoogle(ctx) {
    // store user -> format is createSendTOken
    const response = await EventService.loginWithGoogle();
    const user = response.data.data.user;
    await ctx.commit("SET_USER", user);
    await ctx.commit("SET_IS_LOGGED_IN", true);
    return response;
  },
  async loginWithMicrosoft(ctx) {
    // store user -> format is createSendTOken
    const response = await EventService.loginWithMicrosoft();
    const user = response.data.data.user;
    await ctx.commit("SET_USER", user);
    await ctx.commit("SET_IS_LOGGED_IN", true);
    return response;
  },
  signUp(ctx, formData) {
    return EventService.signup(formData);
  },
  async updateUserInfo(ctx, formData) {
    // store user -> format is data:{user}
    const response = await EventService.updateUserInfo(formData);
    const user = response.data.data.user;
    await ctx.commit("SET_USER", user);
    return response;
  },
  async logOutUser(ctx) {
    // clear user from localStorage
    const response = await EventService.logOut();
    await ctx.commit("SET_USER", null);
    await ctx.commit("SET_IS_LOGGED_IN", false);
    return response;
  },
  updatePassword(ctx, formData) {
    return EventService.updatePassword(formData);
  },
  async verifyEmail(ctx, formData) {
    // store user -> format is data:{user}
    const response = await EventService.verifyUserEmail();
    const user = response.data.data.user;
    await ctx.commit("SET_USER", user);
    return response;
  },
  forgotPassword(ctx, formData) {
    return EventService.forgotPassword(formData);
  },
  forgotPasswordReset(ctx, formData) {
    return EventService.forgotPasswordReset(formData);
  },
  storeUser(ctx, user) {
    ctx.commit("SET_USER", user);
  },
  async storeIsLoggedIn(ctx, isLoggedIn) {
    await ctx.commit("SET_IS_LOGGED_IN", isLoggedIn);
  },
};

export const getters = {};
