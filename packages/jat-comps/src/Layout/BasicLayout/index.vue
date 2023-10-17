<template>
  <AdminLayout :isCollpase="isMenuCollapse">
    <template slot="header">
      <GlobalHeader />
    </template>
    <template slot="sider">
      <GlobalNavigation />
    </template>
    <template slot="tab">
      <GlobalTab />
    </template>
    <template slot="main">
      <GlobalContent />
    </template>
  </AdminLayout>
</template>
<script>
import { mapGetters } from "vuex"
import AdminLayout from "../AdminLayout/index.vue"
import GlobalHeader from "../common/GlobalHeader/index.vue"
import GlobalNavigation from "../common/GlobalNavigation/index.vue"
import GlobalTab from "../common/GlobalTab/index.vue"
import GlobalContent from "../common/GlobalContent/index.vue"
export default {
  name: "BasicLayout",
  components: {
    AdminLayout,
    GlobalHeader,
    GlobalNavigation,
    GlobalTab,
    GlobalContent
  },
  computed: {
    ...mapGetters({
      isMenuCollapse: "routeStore/isMenuCollapse"
    })
  }
}
</script>

<style lang="less" scoped></style>
