<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    @mouseenter="onmouseenter"
    @mouseout="onmouseout"
    :style="{
      color: color,
      transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotate(${rotate}deg)`
    }"
    @click="onClick"
  >
    <use :xlink:href="`#${iconName}`"></use>
  </svg>
</template>
<script>
export default {
  name: "JatIcon",
  props: {
    /** 基座传入 icon-svg名称； 项目传入 local-svg名称 */
    iconName: {
      type: String
    },
    className: {
      type: String
    },
    fill: {
      type: String
    },
    hoverFill: {
      type: String
    },
    rotateY: {
      type: Number,
      default: 0
    },
    rotateX: {
      type: Number,
      default: 0
    },
    rotate: {
      type: Number,
      default: 0
    },
    from: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      color: this.fill
    }
  },
  computed: {
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className
      }
      return "svg-icon"
    }
  },
  watch: {
    fill(val) {
      this.color = val
    }
  },
  methods: {
    onmouseenter() {
      this.color = this.hoverFill || this.fill
    },
    onmouseout() {
      this.color = this.fill
    },
    onClick() {
      this.$emit("click")
    }
  }
}
</script>
<style scoped lang="less">
.svg-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
  overflow: hidden;
}
</style>
