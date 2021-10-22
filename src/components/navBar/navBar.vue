<template>
  <div id="nav">
    <router-link to="/signup" v-if="!isLoggedIn">Sign up</router-link>
    <router-link to="/" v-if="!isLoggedIn">Login</router-link>
    <router-link to="/admin" v-if="isLoggedIn && isAdmin">Admin</router-link>
    <router-link to="/profile" v-if="isLoggedIn">Profile</router-link>
    <span v-if="isLoggedIn"> <a @click="logout()">Logout</a></span>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.getToken;
    },
    isAdmin: function () {
      return this.$store.getters.getAdmin;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
