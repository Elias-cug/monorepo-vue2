<template>
  <div class="header-content w-full h-full">
    <component :is="{ ...customHeader }" v-if="customHeader" />
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "GlobalHeader",
  computed: {
    ...mapGetters({
      customHeader: "appStore/customHeader"
    })
  }
}
</script>
<style scoped lang="less">
.header-content {
  width: 100%;
  height: 100%;
  background: #041c31;
  background-image: url("@jat-comps/assets/img/headerBackground.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
