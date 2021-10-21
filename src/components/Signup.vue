<template>
  <div>
    <div class="signup-container">
      <h1>Sign up</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="signup-form"
          @submit.prevent="handleSubmit(handleRegister)"
        >
          <ValidationProvider
            name="fullname"
            rules="required|verify_fullname"
            v-slot="{ errors }"
          >
            <div class="form-control">
              <label class="label-input">Full name</label>
              <Input
                type="text"
                class="signup-fullname"
                placeholder="Enter full name.."
                v-bind:value="formData.fullname"
                v-on:input="formData.fullname = $event"
                required
              />
            </div>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            name="username"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="form-control">
              <label class="label-input">Username</label>
              <Input
                type="text"
                class="signup-username"
                placeholder="Enter username.."
                v-bind:value="formData.username"
                v-on:input="formData.username = $event"
                required
              />
            </div>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div class="form-control">
              <label class="label-input">Email</label>
              <Input
                type="email"
                class="signup-email"
                placeholder="Enter email.."
                v-bind:value="formData.email"
                v-on:input="formData.email = $event"
                required
              />
            </div>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required|max:30|min:6|verify_password"
            v-slot="{ errors }"
          >
            <div class="form-control">
              <label class="label-input">Password</label>
              <Input
                type="password"
                class="signup-password"
                placeholder="Enter password.."
                v-bind:value="formData.password"
                v-on:input="formData.password = $event"
                required
              />
            </div>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>

          <div class="btn-register-container">
            <customBtn class="btn-register" @onClick="handleRegister()"
              >Sign up</customBtn
            >
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import customBtn from "./buttons/customBtn.vue";
import Input from "./inputs/customInputs.vue";

import { signup } from "../services/authService";

export default {
  components: {
    Input,
    customBtn,
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
        email: "",
        fullname: "",
      },
      message: "",
    };
  },
  methods: {
    async handleRegister() {
      event.preventDefault();
      const credentials = {
        username: this.formData.username,
        password: this.formData.password,
        fullname: this.formData.fullname,
        email: this.formData.email,
      };
      console.log(this.formData);
      try {
        const response = await signup(credentials);
        const token = response.tokens;
        const user = response.data;
        this.$store.dispatch("login", { token, user });
        this.$router.push("/profile");
        this.$vToastify.success("Successfully registered");
      } catch (error) {
        this.$vToastify.error(error.response.data.message);
      }
    },
  },
};
</script>

<style>
@import "./../assets/styles/pagesCss/signupPage.css";
</style>
