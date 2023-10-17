<template>
  <div class="admin-layout">
    <div class="admin-layout-ctn w-full h-full">
      <!-- 头部 -->
      <template v-if="showHeader">
        <header class="layout-header">
          <slot name="header"></slot>
        </header>
      </template>
      <template v-if="showTab">
        <div
          class="layout-tab"
          :class="{
            'layout-tab-collpase': isCollpase,
            'no-sider': !showSider
          }"
        >
          <slot name="tab"></slot>
        </div>
      </template>
      <div
        class="layout-main"
        :class="{
          'layout-main-collpase': isCollpase,
          'no-sider': !showSider,
          'no-tab': !showTab
        }"
      >
        <slot name="main"></slot>
      </div>
      <template v-if="showSider">
        <div
          class="layout-sider"
          :class="{ 'layout-sider-collpase': isCollpase }"
        >
          <slot name="sider"></slot>
          <div class="sider-content"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminLayout",
  props: {
    showHeader: {
      default: true
    },
    showTab: {
      default: true
    },
    showSider: {
      default: true
    },
    isCollpase: {
      default: false
    }
  }
}
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
