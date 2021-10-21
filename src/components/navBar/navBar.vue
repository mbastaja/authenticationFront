<template>
  <div id="nav">
    <router-link to="/signup" v-if="!isLoggedIn">Sign up</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <router-link to="/profile" v-if="isLoggedIn">Profile</router-link>
    <span v-if="isLoggedIn"> <a @click="logout()">Logout</a></span>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function () {
      //   console.log(this.$store.getters.isLoggedIn);
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>
