<template>
  <div
    class="new-icon-wrap flex px-16px py-5px items-center justify-center"
    @click="onClick"
    :class="{ disable__btn: disabled }"
  >
    <component :is="iconType" class="h-full flex items-center mr-6px" />
    <div
      class="flex-shrink-0 text-14px h-full flex items-center justify-center"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {
  NewIcon,
  OnIcon,
  OffIcon,
  EditIcon,
  Add,
  ManageIcon
} from "../SvgIcon/index"
export default {
  name: "NewButton",
  components: {
    NewIcon,
    OnIcon,
    OffIcon,
    EditIcon,
    Add,
    ManageIcon
  },
  props: {
    iconType: String,
    disabled: {
      type: Boolean,
      default: false
    }
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
