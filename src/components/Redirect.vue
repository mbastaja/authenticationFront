<template>
  <div>Redirecting, please wait!</div>
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
    this.token = this.$store.getters.getToken;
    this.userOrAdminGetUserData();
  },
  methods: {
    async userOrAdminGetUserData() {
      if (this.user.role === "admin" || this.user.role === "super") {
        this.isAdmin = true;
        let admin = this.isAdmin;
        this.$store.dispatch("isAdmin", { admin });
        await this.fetchUsers();
        await this.$router.push("/admin");
        await this.fetchUserData();
      } else {
        await this.fetchUserData();
        this.userData = this.$store.getters.getUserInfo;
        await this.$router.push("/profile");
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
        this.users = this.$store.getters.getUsers;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
