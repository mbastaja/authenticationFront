<template>
  <div>
    asd
    <button v-on:click="goBack()">Back to profile</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        user: {},
    };
  },
  methods: {
    goBack() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style>
</style>