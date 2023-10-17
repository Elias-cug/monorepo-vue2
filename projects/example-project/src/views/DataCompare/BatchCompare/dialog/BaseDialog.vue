<template>
  <!--      新建弹窗-->
  <el-dialog
    :visible.sync="visible_"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
    :append-to-body="true"
    :width="width"
    :top="top"
    :lock-scroll="true"
    :custom-class="`jinan-dialog-basic ${className}`"
    @closed="handleAfterClose"
  >
    <template #title>
      <slot name="header"></slot>
      <i class="el-icon-error jinan-base-dialog-close" @click="handleClose"></i>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "BaseDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // modal: {
    //   type: Boolean,
    //   default: true,
    // },
    width: {
      type: String,
      default: "50%"
    },
    top: {
      type: String,
      default: "10%"
    },
    className: {
      type: String,
      default: ""
    }
  },
  emits: ["close", "closed"],
  data: () => ({
    visible_: false
  }),
  methods: {
    handleClose() {
      this.$emit("close")
    },
    handleAfterClose() {
      this.$emit("closed")
    }
  },
  watch: {
    visible: {
      handler(v) {
        this.visible_ = v
      },
      immediate: true
    }
  }
}
</script>
<style scoped lang="less">
:global(.jinan-dialog-basic) {
  border-radius: 0.375rem /* 6px */;
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

:global(.jinan-base-dialog-close) {
  position: absolute;
  top: 0.5rem /* 8px */;
  right: 1rem /* 16px */;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  --tw-text-opacity: 1;
  color: rgb(188 194 210 / var(--tw-text-opacity));
  cursor: pointer;
}
</style>
<style scoped lang="less">
/deep/ .el-dialog {
  .el-dialog__header,
  .el-dialog__body,
  .el-dialog__footer {
    padding: unset !important;
  }

  .el-dialog__header,
  .el-dialog__body,
  .el-dialog__footer {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /*  自定义弹窗样式 */

  .dialog-header {
    letter-spacing: 1px;
    padding: 12px 36px 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 0.375rem /* 6px */;
    border-top-right-radius: 0.375rem /* 6px */;
    background-image: linear-gradient(to bottom, #ffffff, #e8e8f1);
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem /* 28px */;
    font-weight: 600;
  }

  .jinan-base-dialog-close {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transform: scale(1);

    &:hover {
      transform: scale(1.25);
    }
  }

  .dialog-body {
    display: flex;
    justify-content: center;
    padding: 16px;
  }

  .dialog-footer {
    margin: 0 15px;
    padding-left: 1rem /* 16px */;
    padding-bottom: 1.5rem /* 24px */;
    padding-right: 1.5rem /* 24px */;
    border-bottom-right-radius: 0.375rem /* 6px */;
    border-bottom-left-radius: 0.375rem /* 6px */;
  }

  .dialog-body,
  .dialog-footer {
    background: #fbfcff;
  }
}
</style>
