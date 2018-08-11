<template>
  <div class="mun-container">
    <span>{{num}}</span>
  </div>
</template>

<script>
  export default {
    name: "num",
    props: {
      num: Number
    },
    data() {
      return {
        num: ""
      };
    }
  };
</script>

<style scoped>
  span {
    font-size: 18px;
    color: darkmagenta;
  }
</style>
