import Vue from "vue";
import App from "./App.vue";
import VueToastify from "vue-toastify";
import router from "./router";
import store from "./store";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from "vee-validate/dist/vee-validate.full.esm";

extend("verify_password", {
  // eslint-disable-next-line no-unused-vars
  getMessage: (field) =>
    `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: (value) => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
    );
    return strongRegex.test(value);
  },
});
extend("verify_fullname", {
  // eslint-disable-next-line no-unused-vars
  getMessage: (field) => `Full name needs to have atleast two words!`,
  validate: (value) => {
    var strongRegex = new RegExp("^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$");
    return strongRegex.test(value);
  },
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(VueToastify);

Vue.config.productionTip = false;
import "@/assets/main.css";
import vuetify from "./plugins/vuetify";

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
