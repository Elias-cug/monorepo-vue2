<template>
  <div
    class="new-icon-wrap flex px-16px py-5px items-center"
    :class="{ disable__btn: disabled }"
    @click="onClick"
  >
    <NewIcon class="h-full flex items-center mt-3px mr-6px" />
    <div class="flex-shrink-0 text-14px h-full flex items-center"><slot /></div>
  </div>
</template>

<script>
import { NewIcon } from "../SvgIcon/index"
export default {
  name: "NewButton",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NewIcon
  },
  methods: {
    onClick() {
      !this.disabled && this.$emit("click")
    }
  }
}
</script>
<style scoped lang="less">
.new-icon-wrap {
  color: #167cf3;
  box-sizing: border-box;
  border: 1px solid rgba(22, 124, 243, 1);
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      180deg,
      #4097ff 0%,
      #2787ff 5%,
      #2860f3 98%
    );
    border-radius: 2px;
    color: #ffffff;
    border: 1px solid transparent;
  }
  &.disable__btn {
    cursor: not-allowed;
    border: 1px solid #dcdfe6;
    background: #fff;
    color: #c0c4cc;
  }
}
</style>
