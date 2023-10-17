<template>
  <div class="c-title-card w-full h-full p-20px">
    <div v-if="title" class="title mb-12px">{{ title }}</div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "CommonCard",
  props: {
    title: {
      type: String
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.c-title-card {
  background: #ffffff;
  box-sizing: border-box;
  .title {
    font-size: 16px;
    color: #333333;
    font-weight: 600;
  }
}
</style>
