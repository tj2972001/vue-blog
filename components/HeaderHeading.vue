<template>
  <h1>
    <span>{{ text }}</span>
  </h1>
</template>

<script>
const textStr = "Welcome to My Blog";
export default {
  props: {
    text: String,
    default: textStr,
  },
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Red+Hat+Display:900&display=swap");

$color: #111fff;

h1 {
  max-width: 40vw;
  color: #fefefe;

  span {
    font-family: "Red Hat Display", sans-serif;
    background-image: linear-gradient(
      transparent calc(65% - 5px),
      darken($color, 15%) 10px
    );
    background-size: 0;
    background-repeat: no-repeat;
    display: inline;
    transition: 0.5s ease;
  }

  &:hover {
    span {
      background-size: 100%;
    }
  }
}
</style>
