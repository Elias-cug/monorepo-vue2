<template>
  <div class="jat-button">
    <el-button
      :style="btnStyle"
      :disabled="disabled"
      :type="type"
      :size="size"
      :loading="loading"
      :icon="icon"
      @click="handleClick"
    >
      <slot></slot>
    </el-button>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "jat-button",
  props: {
    size: {
      type: String,
      default: "small",
      validator(value) {
        return ["medium", "small", "mini"].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "primary",
      validator(value) {
        return [
          "primary",
          "success",
          "warning",
          "danger",
          "info",
          "text"
        ].includes(value)
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    btnStyle: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e)
    }
  }
}
</script>

<style lang="less">
@import url("../../commonCSS/varibles.less");

.jat-button {
  display: inline-block;

  .el-button {
    min-width: 60px;
    padding: 6px 12px;
    font-family: @fontFamily;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: #fff;
    background: @btnNormalCommon;
    border-color: transparent;
    border-radius: 2px;
    box-sizing: border-box;
    user-select: none;

    &:hover {
      background: @btnHoverCommon;
    }
  }

  .el-button--mini,
  .el-button--mini.is-round {
    min-width: 40px;
    padding: 6px 8px;
    font-size: @fontSize;
    line-height: @fontSize;
  }

  .el-button--small,
  .el-button--small.is-round {
    min-width: 60px;
    padding: 8px 12px;
    font-size: @fontSizeMedium;
    line-height: @fontSizeMedium;
  }

  .el-button--medium,
  .el-button--medium.is-round {
    min-width: 50px;
    padding: 10px 16px;
    font-size: @fontSizeBig;
    line-height: @fontSizeBig;
  }

  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    color: @disabledColorNormal;
    cursor: not-allowed;
    background: @btnDisabledCommon;
    // border: 1px solid @primaryDisableBorder;
  }

  .el-button--primary {
    color: #fff;
    background-image: @btnPrimaryBg;
    border: none;

    &:hover {
      background: @btnHoverPrimary;
    }
  }

  & .el-button--info {
    padding-top: 7px;
    padding-bottom: 7px;
    color: @blueLight;
    background: #fff;
    border: 1px solid @blueLight;

    &:hover {
      background: @btnHoverSecondary;
      color: #ffffff;
    }
  }

  .el-button--danger {
    padding-top: 7px;
    padding-bottom: 7px;
    color: @DangerColor;
    background: #fff;
    border: 1px solid @DangerColor;

    &:hover {
      color: #fff;
      background: @DangerColor;
    }
  }
}
</style>
<style lang="less">
html[theme-color="dark"] {
  .jat-button {
    .el-button--info {
      color: #70f4ff;
      background: transparent;
      border-color: #70f4ff;
    }
  }
}
</style>
