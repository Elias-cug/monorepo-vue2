<template>
  <div
    class="export-icon-wrap flex px-16px py-5px items-center"
    :class="[
      disabled && 'disable__btn',
      exportButtonType ? exportButtonType : ''
    ]"
    @click.stop="onClick"
  >
    <FieldIcon class="h-full flex items-center mt-2px mr-4px" />
    <div class="flex-shrink-0 text-14px h-full flex items-center"><slot /></div>
  </div>
</template>

<script>
import { FieldIcon } from "../SvgIcon/index"
export default {
  name: "FieldVisableButton",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    exportButtonType: {
      type: String,
      validator(value) {
        return ["normal", "green"].includes(value)
      },
      default: "normal"
    }
  },
  components: {
    FieldIcon
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
  color: #8854d4;
  box-sizing: border-box;
  border: 1px solid #8854d4;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(105deg, #9e67ee 0%, #8854d4 100%);
    border-radius: 4px;
    color: #ffffff;
    border: 1px solid #9e67ee;
  }
  &.disable__btn {
    cursor: not-allowed;
    border: 1px solid #dcdfe6;
    background: #fff;
    color: #c0c4cc;
  }

  &.green {
    color: #03b617;
    border-color: #03b617;
    &:hover {
      background-image: linear-gradient(180deg, #07dc33 0%, #03b617 100%);
      border: 1px solid #07dc33;
      color: #ffffff;
    }
  }
}
</style>
