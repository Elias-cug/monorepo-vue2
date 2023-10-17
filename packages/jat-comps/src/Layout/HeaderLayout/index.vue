<template>
  <AdminLayout :isCollpase="isMenuCollapse" :showSider="false" :showTab="false">
    <template slot="header">
      <GlobalHeader />
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
import GlobalContent from "../common/GlobalContent/index.vue"
export default {
  name: "BasicLayout",
  components: {
    AdminLayout,
    GlobalHeader,
    GlobalContent
  },
  computed: {
    ...mapGetters({
      isMenuCollapse: "routeStore/isMenuCollapse"
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
