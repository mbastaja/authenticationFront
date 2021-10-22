import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => ({
  token: "",
  user: {},
  users: {},
  userInfo: {},
  admin: false,
});

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],

  state: getDefaultState(),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_ADMIN: (state, admin) => {
      state.admin = admin;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token.token);
      commit("SET_USER", user);
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
    getUserById: ({ commit }, { user_info }) => {
      commit("SET_USER_INFO", user_info);
    },
    getAllUsers: ({ commit }, { users }) => {
      commit("SET_USERS", users);
    },
    isAdmin: ({ commit }, { admin }) => {
      commit("SET_ADMIN", admin);
    },
  },
  getters: {
    isLoggedIn: (state) => state.token,
    getUser: (state) => state.user,
    getUserInfo: (state) => state.userInfo,
    getUsers: (state) => state.users,
    getAdmin: (state) => state.admin,
  },
  modules: {},
});
