<template>
  <div id="app">
    <div id="nav">
      <app-navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";

export default {
  components: {
    "app-navigation": navBar,
  },
  name: "App",
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c6c6c7;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #6a7179;
  margin-right: 7px;
  font-size: 24px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: rgb(66, 155, 141);
}
</style>
