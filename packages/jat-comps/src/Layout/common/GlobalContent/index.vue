<template>
  <transition name="fade-transform" mode="out-in">
    <span>
      <keep-alive :include="cacheRoutes">
        <router-view :key="key" v-if="$route.meta.isKeepAlive" />
      </keep-alive>
      <router-view :key="key" v-if="!$route.meta.isKeepAlive" />
    </span>
  </transition>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    key() {
      return this.$route.path
    },
    ...mapGetters({
      cacheRoutes: "routeStore/cacheRoutes"
    })
  }
}
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
