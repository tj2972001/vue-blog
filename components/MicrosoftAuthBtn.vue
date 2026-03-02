<template>
  <div class="MicrosoftLoginContainer">
    <button
      class="MicrosoftLoginContainer__login-with-microsoft-btn"
      @click="loginWithMicrosoftMethod"
    >
      <object
        type="image/svg+xml"
        data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
        class="x-icon"
      ></object>
      Continue with Microsoft
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("user", ["loginWithMicrosoft"]),
    async loginWithMicrosoftMethod() {
      try {
        const response = await this.loginWithMicrosoft();
        console.log("RESPONSE: ", response);
      } catch (e) {
        this.$toast.error(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.x-icon {
  height: 1em;
  width: 1em;
  top: 0.125em;
  position: relative;
}

.MicrosoftLoginContainer {
  margin-top: 1rem;

  &__login-with-microsoft-btn {
    transition: background-color 0.3s, box-shadow 0.3s;
    padding: 1rem;
    padding-left: 1rem;
    border: none;
    border-radius: 50px;

    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

    color: #757575;
    font-size: 1rem;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    background-color: white;
    background-position: 0.5rem 1rem;

    background-repeat: no-repeat;

    &:hover {
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }

    &:active {
      background-color: #eeeeee;
    }

    &:focus {
      outline: none;
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
        0 0 0 3px #c8dafc;
    }

    &:disabled {
      filter: grayscale(100%);
      background-color: #ebebeb;
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
}
</style>
