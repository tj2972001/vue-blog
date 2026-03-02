import { getLocalStorage } from "assets/js/helper";
import { mapActions } from "vuex";
export const syncUser = {
  methods: {
    ...mapActions("user", ["storeUser", "storeIsLoggedIn"]),
    isLoggedInMethod() {
      let ans;
      if (this.$store.state.isLoggedIn) {
        ans = this.$store.state.isLoggedIn;
      } else {
        ans = getLocalStorage("isLoggedIn");
        this.storeIsLoggedIn(ans);
      }
      return ans;
    },
    getUserMethod() {
      let ans;
      if (this.$store.state.userDetails) {
        ans = this.$store.state.userDetails;
      } else {
        ans = getLocalStorage("user");
        this.storeUser(ans);
      }
      return ans;
    },
  },
  data() {
    return {
      isLoggedIn: this.isLoggedInMethod(),
      userDetails: this.getUserMethod(),
    };
  },
};
