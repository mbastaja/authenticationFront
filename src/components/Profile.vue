<template>
  <div class="container">
    <h1>Profile page</h1>
    <div class="user-data-container">
      <h2 v-if="this.$route.params.id">
        This is a profile of a user with ID {{ user.id }}
      </h2>
      <h2 v-else>This is a profile of a user with ID {{ userData.id }}</h2>

      <customBtn
        v-if="this.$route.params.id"
        @onClick="openEditUserProfile(user.id)"
        ><i class="fas fa-user-edit fa-3x"></i
      ></customBtn>

      <customBtn v-else @onClick="openEditUserProfile(userData.id)"
        ><i class="fas fa-user-edit fa-3x"></i
      ></customBtn>

      <label class="user-info">Full name </label>
      <div v-if="this.$route.params.id" class="user-data">
        {{ user.fullname }}
      </div>
      <div v-else class="user-data">{{ userData.fullname }}</div>

      <label class="user-info">Username </label>
      <div v-if="this.$route.params.id" class="user-data">
        {{ user.username }}
      </div>
      <div v-else class="user-data">{{ userData.username }}</div>

      <label class="user-info">Email </label>
      <div v-if="this.$route.params.id" class="user-data">
        {{ user.email }}
      </div>
      <div v-else class="user-data">
        {{ userData.email }}
      </div>

      <label class="user-info">Password </label>
      <div v-if="this.$route.params.id" class="user-data-password">
        {{ user.password }}
      </div>
      <div v-else class="user-data-password">{{ userData.password }}</div>
    </div>
  </div>
</template>

<script>
import customBtn from "./buttons/customBtn.vue";

export default {
  components: {
    customBtn,
  },
  data() {
    return {
      userData: {},
      user: {},
      id: "",
    };
  },
  created() {
    this.userData = this.$store.getters.getUserInfo;
    this.id = this.$route.params.id;
    this.adminSearchUserById();
  },

  methods: {
    adminSearchUserById() {
      if (this.$store.getters.getAdmin) {
        let data = this.$store.getters.getUsers;
        let id = this.id;
        this.user = data.find(function (post) {
          if (post.id == `${id}`) return true;
        });
      }
    },
    openEditUserProfile(id) {
      this.$router.push(`/edituser/${id}`);
    },
  },
};
</script>

<style>
@import "./../assets/styles/pagesCss/profilePage.css";
</style>
