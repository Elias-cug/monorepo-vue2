<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    // console.log(
    //   this.$store.state.users.menus,
    //   this.$store.getters["users/menus"]
    // )
  }
}
</script>
<style lang="less">
html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
