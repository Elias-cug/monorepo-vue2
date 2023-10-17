<template>
  <div class="c-empty w-full h-full flex flex-col items-center justify-center">
    <img :style="{ ...imgStyle }" src="../../assets//img/nodata.png" />
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: {
    content: {
      type: String,
      default: "暂无数据"
    },
    imgStyle: {
      type: Object,
      default: () => ({
        width: "86px",
        height: "55px"
      })
    }
  }
}
</script>
<style scope lang="less">
.c-empty {
  color: #999999;
}
</style>
