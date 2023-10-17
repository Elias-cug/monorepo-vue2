<template>
  <div class="jat-pagination">
    <el-pagination
      :layout="layout"
      :background="background"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      :current-page="currentPage"
      :pager-count="pagerCount"
      :popper-class="popperClass + ' ' + 'jat-select-popover'"
      :prev-text="prevText"
      :next-text="nextText"
      :disabled="disabled"
      :total="total"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "jat-pagination",
  props: {
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper, ->, total, slot"
    }, // 组件布局，子组件名用逗号分隔 sizes, prev, pager, next, jumper, ->, total, slot
    total: Number, // 总条目数
    pageSize: {
      type: Number,
      default: 10
    }, // 每页显示条目个数
    currentPage: Number,
    /** @description 页码按钮的数量，当总页数超过该值时会折叠 大于等于 5 且小于等于 21 的奇数 */
    pagerCount: {
      type: Number,
      default: 7
    },
    popperClass: String,
    prevText: String,
    nextText: String,
    disabled: Boolean,
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否为分页按钮添加背景色
     */
    background: Boolean
  },
  data() {
    return {}
  },
  components: {},
  mounted() {},
  methods: {
    handleSizeChange(item) {
      this.$emit("size-change", item) // pageSize 改变时会触发
    },
    handleCurrentChange(item) {
      this.$emit("update:currentPage", item)
      this.$emit("current-change", item) // currentPage 改变时会触发
    },
    handlePrevClick(item) {
      this.$emit("prev-click", item) // 用户点击上一页按钮改变当前页后触发
    },
    handleNextClick(item) {
      this.$emit("next-click", item) // 用户点击下一页按钮改变当前页后触发
    }
  }
}
</script>

<style lang="less">
@import url("../../commonCSS/varibles.less");

.jat-pagination {
  width: 100%;

  .el-pagination {
    padding: 0;

    .el-pagination__sizes {
      margin: 0 4px 0 0;
      font-weight: normal;
      color: @fontColor;

      .el-select .el-input {
        width: 82px;
        height: 22px;
        margin: 0;

        .el-input__inner {
          height: 22px;
          line-height: 22px;
          border: 1px solid #d5d5d5;
          border-radius: 2px;
        }
      }
    }

    button,
    span:not([class*="suffix"]),
    .el-select__caret {
      height: 22px;
      line-height: 22px;
    }
  }

  .el-pager {
    padding: 0 2px;
    margin-top: 2px;

    li {
      height: 18px;
      min-width: 4px;
      padding: 0 5px;
      margin: 0 2px;
      font-size: @fontSize;
      line-height: 18px;
      color: @fontColor;
      background-color: transparent;
      border-radius: 2px;

      &.active {
        color: #fff;
        background-color: @active;
      }
    }

    .more::before {
      line-height: 20px;
    }
  }

  .el-pagination__editor {
    height: 22px;

    &.el-input {
      width: 36px;
      min-width: 36px;

      .el-input__inner {
        height: 22px;
        line-height: 22px;
        border: 1px solid #d5d5d5;
        border-radius: 2px;

        &:hover {
          border-color: @focusColor;
        }

        &:focus {
          border-color: @focusColor;
        }
      }
    }
  }

  // .el-pagination {
  //   padding: 0;
  //   font-weight: normal;
  //   color: @tipColor;

  //   button {
  //     width: 20px;
  //     height: 18px;
  //     min-width: 20px;
  //     padding: 0;
  //     border-radius: 2px;

  //     &:disabled {
  //       color: #c4c4c4;
  //       background-color: #29304c;
  //     }
  //   }

  //   .btn-next,
  //   .btn-prev {
  //     margin: 0;
  //     margin-top: 2px;
  //     color: @fontColor;
  //     background: center center no-repeat #29304c;
  //     background-size: 12px;

  //     .el-icon {
  //       font-weight: normal;
  //     }
  //   }

  //   .el-pagination__total {
  //     margin-right: 4px;
  //     font-weight: normal;
  //     color: @tipColor;
  //   }

  //   .el-pagination__jump {
  //     display: flex !important;
  //     align-items: center;
  //     justify-content: center;
  //     margin-left: 12px;
  //     font-weight: normal;
  //     color: @tipColor;
  //   }

  // .el-pagination.is-background .el-pager li:not(.disabled).active {
  //   color: @fontColor;
  //   background-color: @active;
  // }

  // .el-pagination.is-background .btn-next.disabled,
  // .el-pagination.is-background .btn-next:disabled,
  // .el-pagination.is-background .btn-prev.disabled,
  // .el-pagination.is-background .btn-prev:disabled,
  // .el-pagination.is-background .el-pager li.disabled {
  //   color: #c4c4c4;
  // }

  // .el-pagination.is-background .btn-next,
  // .el-pagination.is-background .btn-prev,
  // .el-pagination.is-background .el-pager li {
  //   min-width: 20px;
  //   color: @tipColor;
  //   background-color: #29304c;
  // }
  // // 下拉框
  // .el-input {
  //   display: flex;
  //   font-size: @fontSize;
  // }

  // .el-input--mini .el-input__inner {
  //   height: 22px;
  //   padding: 0 8px;
  //   font-family: @fontFamily;
  //   font-size: @fontSize;
  //   line-height: 22px;
  //   color: @fontColor;
  //   background-color: @bgInput;
  //   border-color: @borderColor;
  //   border-radius: 10px;
  //   box-shadow: none;

  //   &::-webkit-input-placeholder {
  //     color: @placeholder;
  //   }

  //   &:hover {
  //     border-color: @focusColor;
  //   }
  // }

  // .el-input--mini .el-input__icon {
  //   width: 16px;
  //   line-height: 22px;
  // }

  // .el-input__suffix {
  //   right: 3px;
  // }

  // .el-icon-arrow-up::before {
  //   color: @tipColor;
  // }
}
</style>
<style lang="less">
@import url("../../commonCSS/variable-dark.less");

html[theme-color="dark"] {
  .el-pagination {
    .el-pagination__sizes {
      margin: 0 4px 0 0;
      font-weight: normal;
      color: #fff;

      .el-select .el-input {
        .el-input__inner {
          color: #fff;
          background: #19427d;
        }
      }
    }

    button,
    span:not([class*="suffix"]),
    .el-select__caret {
      color: #a5caff;
      background: transparent;
    }
  }
}
</style>
