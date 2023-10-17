<template>
  <div class="h-full">
    <div class="common-header w-full flex h-52px">
      <div class="title h-full flex items-center">{{ title }}</div>
      <div class="h-full flex flex-1 items-center justify-end">
        <slot name="header" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scope lang="less">
.common-header {
  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    font-weight: 600;
    &::before {
      content: "";
      margin-right: 6px;
      width: 2px;
      height: 16px;
      background-image: linear-gradient(180deg, #1c83fb 0%, #0054b7 100%);
    }
  }
}
</style>
