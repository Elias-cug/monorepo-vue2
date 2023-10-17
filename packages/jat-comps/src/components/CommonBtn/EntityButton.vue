<template>
  <div
    class="export-icon-wrap flex px-16px py-5px items-center"
    :class="[disabled && 'disable__btn']"
    @click="onClick"
  >
    <EntityIcon class="h-full flex items-center mt-2px mr-4px" />
    <div class="flex-shrink-0 text-14px h-full flex items-center"><slot /></div>
  </div>
</template>

<script>
import { EntityIcon } from "../SvgIcon/index"
export default {
  name: "ExportButton",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    EntityIcon
  },
  methods: {
    onClick() {
      !this.disabled && this.$emit("click")
    }
  }
}
</script>
<style scoped lang="less">
.export-icon-wrap {
  color: #167cf3;
  box-sizing: border-box;
  border: 1px solid #167cf3;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      180deg,
      #4097ff 0%,
      #2787ff 5%,
      #2860f3 98%
    );
    border-radius: 4px;
    color: #ffffff;
    border: 1px solid #4097ff;
  }
  &.disable__btn {
    cursor: not-allowed;
    border: 1px solid #dcdfe6 !important;
    background: #fff !important;
    color: #c0c4cc !important;
  }
}
</style>
