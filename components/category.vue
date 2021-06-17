<template>
  <span> {{ category }}</span>
</template>

<script>
export default {
  props: ["category"],
};
</script>

<style scoped>
span {
  background-color: #eee;
  border-radius: 4rem;
  padding: 0.3rem 0.7rem;
  margin-right: 1rem;
}
</style>
>
