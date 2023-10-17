<template>
  <div
    class="jat-btn-wrap jat-btn px-16px py-5px flex items-center justify-center h-32px line-height-32px"
    @click="onClick"
    :class="{ disable__btn: disabled, [typeClass]: true, [bgType]: true }"
  >
    <i v-if="loading" class="el-icon-loading"></i>
    <JatIcon
      v-if="iconName"
      :iconName="iconName"
      class="mr-6px flex shrink-0"
    />
    <slot />
  </div>
</template>

<script>
import JatIcon from "../JatIcon/JatIcon.vue"
export default {
  name: "NewButton",
  components: {
    JatIcon
  },
  props: {
    /** 和 jatIcon传参一致 */
    iconName: String,
    disabled: {
      type: Boolean,
      default: false
    },
    /** "blue" | "green" | "red" | "purple" */
    type: {
      type: String,
      default: "blue"
    },
    /** 是否填充 */
    fill: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeClass: function () {
      return `button__type__${this.type}`
    },
    bgType: function () {
      return this.fill ? "bg__fill" : "bg__nofill"
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
@bg_blue: linear-gradient(104deg, #1287ff 0%, #2261d5 100%);
@color_blue: #167cf3;

@bg_green: linear-gradient(180deg, #07dc33 0%, #03b617 100%);
@color_green: #03b617;

@bg_red: linear-gradient(105deg, #e66565 0%, #d54b4b 100%);
@color_red: #e66565;

@bg_purple: linear-gradient(105deg, #9e67ee 0%, #8854d4 100%);
@color_purple: #8854d4;

.jat-btn-wrap {
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &.bg__nofill {
    &.jat-btn:hover {
      color: #ffffff;
      border: 1px solid transparent;
    }
    &.button__type__blue {
      color: @color_blue;
      border: 1px solid @color_blue;
      &:hover {
        background-image: @bg_blue;
      }
    }
    &.button__type__green {
      color: @color_green;
      border: 1px solid @color_green;
      &:hover {
        background-image: @bg_green;
      }
    }
    &.button__type__purple {
      color: @color_purple;
      border: 1px solid @color_purple;
      &:hover {
        background-image: @bg_purple;
      }
    }
    &.button__type__red {
      color: @color_red;
      border: 1px solid @color_red;
      &:hover {
        background-image: @bg_red;
      }
    }
  }
  &.bg__fill {
    color: #ffffff;
    border: 1px solid transparent;
    &.jat-btn:hover {
      color: #ffffff;
      border: 1px solid transparent;
    }
    &.button__type__blue {
      background-image: @bg_blue;
      &:hover {
        background-image: @bg_blue;
      }
    }
    &.button__type__green {
      background-image: @bg_green;
      &:hover {
        background-image: @bg_green;
      }
    }
    &.button__type__purple {
      background-image: @bg_purple;
      &:hover {
        background-image: @bg_purple;
      }
    }
    &.button__type__red {
      background-image: @bg_red;
      &:hover {
        background-image: @bg_red;
      }
    }
  }
  &.jat-btn-wrap.disable__btn.jat-btn {
    cursor: not-allowed;
    border: 1px solid #dcdfe6;
    background: #fff;
    color: #c0c4cc;
  }
}
.el-icon-loading {
  margin-right: 4px;
}
</style>
