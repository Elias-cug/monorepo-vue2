<template>
  <div class="c-left-right-layout flex w-full h-full">
    <div
      class="left relative h-full shrink-0"
      :class="{ 'mr-18px': isExpand }"
      :style="{ width: isExpand ? sideWidth : 0 }"
    >
      <div
        class="expand absolute top-45%"
        :class="{ 'right--19px': isExpand, 'right-0px': !isExpand }"
        @click="onExpand"
      >
        <div
          :style="{ display: isExpand ? 'block' : 'none' }"
          class="img-shou h-full w-full"
        />
        <div
          :style="{ display: isExpand ? 'none' : 'block' }"
          class="img-zhan h-full w-full"
        />
      </div>
      <div
        class="w-full h-full"
        :style="{ display: isExpand ? 'block' : 'none' }"
      >
        <slot name="left" />
      </div>
    </div>
    <div
      class="right h-full flex-1"
      :style="{
        'background-color': rightBgColor,
        width: `calc(100% - ${isExpand ? '250px' : '0px'})`
      }"
    >
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  name: "LeftRightLayout",
  props: {
    sideWidth: {
      type: String,
      default: "250px"
    },
    rightBgColor: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {
      isExpand: true
    }
  },
  methods: {
    onExpand() {
      this.isExpand = !this.isExpand
    }
  }
}
</script>
<style scoped lang="less">
@img: "../../../assets/img";
.c-left-right-layout {
  .left {
    background: #ffffff;
    border-radius: 4px;
  }
  .left {
    .expand {
      width: 19px;
      height: 70px;
      cursor: pointer;
      .img-shou {
        background: url("@{img}/shouqi.png");
        &:hover {
          background: url("@{img}/shouqi-hover.png");
        }
      }
      .img-zhan {
        background: url("@{img}/zhankai.png");
        &:hover {
          background: url("@{img}/zhankai-hover.png");
        }
      }
    }
  }
}
</style>
