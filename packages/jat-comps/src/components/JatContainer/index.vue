<template>
  <div class="jat-container p-20px h-full w-full">
    <div class="jat-container-box h-full w-full">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "JatContainer"
}
</script>
<style lang="less" scoped>
.jat-container-box {
  background-color: var(--container-color);
}
</style>
