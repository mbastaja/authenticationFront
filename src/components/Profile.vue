<template>
  <div class="container">
    <div v-if="!isAdmin">
      <h3>This is a profile of a user with ID {{ userData.id }}</h3>
      <div>
        <label>Full name: </label>
        {{ userData.fullname }}
      </div>
      <div>
        <label>Username: </label>
        {{ userData.username }}
      </div>
      <div>
        <label>Password: </label>
        {{ userData.password }}
      </div>
    </div>
    <div class="users-container" v-else>
      <h1>Admin page</h1>
      <div class="list-container">
        <div class="users-list">
          <label v-for="user in users" :key="user.id" class="user-listed">
            <div v-on:click="openUserProfile(user.id)" class="user-div">
              <h3>{{ user.role }}</h3>
              <label class="user-text">ID: {{ user.id }}</label>
              <label class="user-text">Username: {{ user.username }}</label>
              <label class="user-text">Full name: {{ user.fullname }}</label>
              <label class="user-text">Email: {{ user.email }}</label>
              <label class="password-user">Password: {{ user.password }}</label>
              <label class="user-text">Role: {{ user.role }}</label>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserById, getAllUsers } from "../services/authService";

export default {
  data() {
    return {
      userData: {},
      isAdmin: false,
      token: "",
      user: {},
      users: {},
    };
  },
  created() {
    this.user = this.$store.getters.getUser;
    this.token = this.$store.getters.isLoggedIn;
    this.userOrAdminGetUserData();
    this.verifyRole();
  },
  mounted() {
    // this.userData = this.$store.getters.getUserInfo;
  },
  methods: {
    verifyRole() {
      if (this.user.role === "admin" || this.user.role === "super") {
        this.isAdmin = true;
      }
    },
    async userOrAdminGetUserData() {
      if (this.user.role === "admin" || this.user.role === "super") {
        await this.fetchUsers();
        this.users = this.$store.getters.getUsers;
      } else {
        await this.fetchUserData();
        this.userData = this.$store.getters.getUserInfo;
      }
    },
    async fetchUserData() {
      try {
        const response = await getUserById();
        const user_info = response.data[0];
        this.$store.dispatch("getUserById", { user_info });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUsers() {
      try {
        const response = await getAllUsers();
        const users = response.data;
        this.$store.dispatch("getAllUsers", { users });
      } catch (error) {
        console.log(error);
      }
    },
    openUserProfile(id) {
      this.$router.push(`/edituser/${id}`);
    },
  },
};
</script>
<style>
@import "./../assets/styles/pagesCss/profilePage.css";
</style>
