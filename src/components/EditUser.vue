<template>
  <div class="signup-container">
    <h1>Edit user</h1>
    <customBtn v-if="isAdmin" class="btn-delete-user" @onClick="handleDelete()"
      ><i class="fas fa-user-times fa-3x"></i
    ></customBtn>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="signup-form" @submit.prevent="handleSubmit(handleUpdate)">
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
          <customBtn class="btn-register" @onClick="handleUpdate()"
            >Update</customBtn
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Input from "./inputs/customInputs.vue";
import customBtn from "./buttons/customBtn.vue";
import {
  adminDeleteUser,
  adminEditUser,
  editUser,
} from "../services/authService";

export default {
  components: {
    Input,
    customBtn,
  },
  data() {
    return {
      user: {},
      id: "",
      formData: {
        username: "",
        password: "",
        email: "",
        fullname: "",
      },
      users: {},
    };
  },
  created() {
    this.users = this.$store.getters.getUsers;
    this.id = this.$route.params.id;
  },
  mounted() {
    this.adminSearchUserById();
  },
  computed: {
    isAdmin: function () {
      return this.$store.getters.getAdmin;
    },
  },
  methods: {
    async handleDelete() {
      if (this.user.role === "user") {
        const response = await adminDeleteUser(this.id);
        this.$router.push("/redirect");
        this.$vToastify.success(response.message);
      } else {
        this.$vToastify.error("Can not delete admin/super user!");
      }
    },
    async handleUpdate() {
      if (this.$store.getters.getAdmin) {
        this.adminEdit();
      } else {
        this.userEdit();
      }
    },
    async userEdit() {
      event.preventDefault();
      const credentials = {
        id: this.id,
        username: this.formData.username,
        password: this.formData.password,
        email: this.formData.email,
        fullname: this.formData.fullname,
      };
      if (
        credentials.username !== "" &&
        credentials.password !== "" &&
        credentials.email !== "" &&
        credentials.fullname !== ""
      ) {
        try {
          await editUser(credentials);
          this.$vToastify.success("User successfully updated.");
          this.$router.push("/redirect");
        } catch (error) {
          this.$vToastify.error(error.response.data.message);
        }
      } else {
        this.$vToastify.error("Please fill out all the fields");
      }
    },
    async adminEdit() {
      event.preventDefault();
      if (this.user.role === "user") {
        const credentials = {
          id: this.id,
          username: this.formData.username,
          password: this.formData.password,
          email: this.formData.email,
          fullname: this.formData.fullname,
        };
        if (
          credentials.username !== "" &&
          credentials.password !== "" &&
          credentials.email !== "" &&
          credentials.fullname !== ""
        ) {
          try {
            await adminEditUser(credentials);
            this.$vToastify.success("User successfully updated by admin.");
            this.$router.push("/redirect");
          } catch (error) {
            this.$vToastify.error(error.response.data.message);
          }
        } else {
          this.$vToastify.error("Please fill out all the fields");
        }
      } else {
        this.$vToastify.error("Admin can not edit other admin!");
      }
    },
    adminSearchUserById() {
      if (this.$store.getters.getAdmin) {
        let data = this.users;
        let id = this.id;
        this.user = data.find(function (post) {
          if (post.id == `${id}`) return true;
        });
      }
    },
  },
};
</script>

<style>
@import "./../assets/styles/pagesCss/signupPage.css";
</style>
