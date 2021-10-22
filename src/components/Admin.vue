<template>
  <div v-if="isAdmin" class="users-container">
    <h1>Admin page</h1>
    <div class="list-container">
      <div
        v-for="user in users"
        :key="user.id"
        v-on:click="openUserProfile(user.id)"
        class="user-div"
        :data-result-val="user.role"
      >
        <h3>{{ user.role }}</h3>
        <label class="user-text">ID: {{ user.id }}</label>
        <label class="user-text">Username: {{ user.username }}</label>
        <label class="user-text">Full name: {{ user.fullname }}</label>
        <label class="user-text">Email: {{ user.email }}</label>
        <label class="password-user">Password: {{ user.password }}</label>
        <label class="user-text">Role: {{ user.role }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: {},
    };
  },
  created() {
    this.users = this.$store.getters.getUsers;
  },
  computed: {
    isAdmin: function () {
      return this.$store.getters.getAdmin;
    },
  },
  methods: {
    openUserProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
  },
};
</script>

<style>
@import "./../assets/styles/pagesCss/adminPage.css";
</style>
