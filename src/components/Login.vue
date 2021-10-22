<template>
  <div class="wrapper">
    <h1>Login</h1>
    <div class="container">
      <form class="login-form" v-on:submit.prevent="handleLogin">
        <div class="inside-form">
          <Input
            type="text"
            class="username"
            placeholder="Enter username.."
            v-bind:value="username"
            v-on:input="username = $event"
          />
          <Input
            type="password"
            class="password"
            placeholder="Enter password.."
            v-bind:value="password"
            v-on:input="password = $event"
          />
          <div class="btn-login-container">
            <customBtn class="btn-login" @onClick="handleLogin()"
              >Log in</customBtn
            >
          </div>
        </div>
      </form>
      <div class="bottom-of-form">
        <p class="p-btn-signup">Are you not registered?</p>
        <customBtn class="btn-signup" @onClick="changePage()"
          >Sign up</customBtn
        >
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./inputs/customInputs.vue";
import customBtn from "./buttons/customBtn.vue";
import { login } from "../services/authService";

export default {
  components: {
    Input,
    customBtn,
  },
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async handleLogin() {
      event.preventDefault();
      const credentials = {
        username: this.username,
        password: this.password,
      };
      try {
        const response = await login(credentials);

        const token = response.tokens;
        const user = response.data;

        this.$store.dispatch("login", { token, user });

        this.$router.push("/redirect");

        this.$vToastify.success("Successfully logged in");
      } catch (error) {
        this.$vToastify.error(error.response.data.message);
      }
    },
    changePage() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style>
@import "./../assets/styles/pagesCss/loginPage.css";
</style>
