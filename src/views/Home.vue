<template>
  <div class="home">
    <div>111</div>
    <h3>allowRoutes</h3>
    <div>{{ $store.getters.allowRoutes }}</div>
    <h3>menus</h3>
    <div>{{ $store.getters.menus }}</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {};
  },
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
