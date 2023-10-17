<template>
  <span
    :class="[
      type.indexOf('range') == -1 ? 'jat-date-picker' : 'jat-date-picker-range'
    ]"
    :style="{ width: width }"
  >
    <el-date-picker
      v-model="timeValue"
      :type="type"
      :size="size"
      :format="format"
      :value-format="valueFormat"
      :editable="editable"
      ref="jatDatePicker"
      :popper-class="
        'jat-daterange-popover__' +
        type +
        ' common-datePicker-popover' +
        ' ' +
        popperClass
      "
      @input="handleInput"
      :class="readonly && 'readOnlyPicker'"
      @blur="handleHide"
      @focus="handleShow"
      @change="handleChange"
      :clearable="clearable"
      :range-separator="rangeSeparator"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :unlink-panels="unlinkPanels"
      :disabled="disabled"
      :readonly="readonly"
      :default-value="defaultValue"
      :default-time="defaultTime"
      :prefix-icon="prefixIcon"
      :name="name"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </span>
</template>

<script type="text/javascript">
export default {
  name: "jat-date-picker",
  props: {
    value: {
      type: [Object, Array, String]
    },
    /** year/month/date/dates/months/years week/datetime/datetimerange/ daterange/monthrange */
    type: {
      type: String,
      default: "monthrange",
      validator(value) {
        return [
          "year",
          "month",
          "date",
          "dates",
          "months",
          "years",
          "datetime",
          "datetimerange",
          "daterange",
          "monthrange"
        ].includes(value)
      }
    },
    popoverFlag: Boolean,
    format: {
      type: String,
      default: ""
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd"
    },
    width: {
      type: String,
      default: ""
    },
    /** 文本框是否可以输入 */
    editable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    startPlaceholder: {
      type: String,
      default: "开始时间"
    },
    endPlaceholder: {
      type: String,
      default: "结束时间"
    },
    rangeSeparator: {
      type: String,
      default: "至"
    },
    popperClass: {
      type: String,
      default: ""
    },
    /** 在范围选择器里取消两个日期面板之间的联动 */
    unlinkPanels: Boolean,
    /** 可选，选择器打开时默认显示的时间 */
    defaultValue: Date,
    /**
     * 范围选择时选中日期所使用的当日内具体时刻,数组，长度为 2，
     * 每项值为字符串，形如12:00:00，
     * 第一项指定开始日期的时刻，
     * 第二项指定结束日期的时刻，
     * 不指定会使用时刻 00:00:00
     */
    defaultTime: Array,
    prefixIcon: {
      type: String,
      default: ""
    },
    /** 原生属性 */
    name: String,
    pickerOptions: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      timeValue: ""
    }
  },
  components: {},
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.timeValue = newValue
      }
    },
    popoverFlag(val) {
      if (!val) {
        this.$refs.jatDatePicker.handleClose()
      }
    }
  },
  model: {
    event: "input",
    prop: "value"
  },
  created() {
    this.timeValue = this.value
  },
  mounted() {},
  methods: {
    handleInput(item) {
      this.timeValue = this.value
      this.$emit("input", item)
    },
    handleChange(item) {
      this.$emit("change", item)
    },
    handleHide(item) {
      this.$emit("blur", item)
    },
    handleShow(item) {
      this.$emit("focus", item)
    }
  }
}
</script>

<style lang="less">
@import url("../../commonCSS/varibles.less");

.jat-date-picker,
.jat-date-picker-range {
  display: inline-block;
  width: 128px;
  height: 30px;
  line-height: 30px;
  // range
  .el-range-editor {
    .el-input__inner {
      padding: 5px 12px;
    }
  }

  .el-date-editor {
    width: 100% !important;

    .el-range__icon {
      display: flex;
      align-items: center;
      font-size: @fontSize;
      line-height: @fontSize;
      color: @tipColor;
    }
  }

  .el-input--prefix {
    // date
    .el-input__prefix {
      right: 0;
      left: auto;
      width: 30px;
      background: url("./datePickerIcon.png") no-repeat;
      background-position: center;
      border-left: 1px solid #d5d5d5;

      .el-input__icon {
        display: none;
      }

      .el-input__inner {
        padding-right: 30px;
        padding-left: 8px;
      }
    }
  }

  .el-input--suffix {
    &.is-disabled {
      .el-input__inner {
        background-color: #282f49;
        border: 1px solid #2d3552;
      }
    }

    .el-input__suffix {
      right: 0;
      transition: 0s;
    }

    .el-input__inner {
      padding-right: 30px;
      padding-left: 8px;
    }

    .el-icon-circle-close {
      position: relative;
      top: 0;
      right: 1px;
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px !important;
      color: #333;
      background: #fff;
      border-radius: 4px;
      transition: 0s;
    }
  }

  .el-input__suffix-inner {
    color: #fff;

    .el-input__icon {
      font-size: @fontSize;
      line-height: @fontSize;
    }
  }

  .el-input__inner {
    height: 30px;
    font-family: @fontFamily;
    font-size: @fontSize;
    line-height: 30px;
    color: @fontColor;
    text-align: left;
    background-color: @bgInput;
    border: 1px solid @borderColor;
    box-sizing: border-box;

    &:hover {
      border-color: @hoverColor;
    }

    &:focus {
      border-color: @inputFocusColor;
    }

    &::-webkit-input-placeholder {
      color: @placeholder;
    }
  }

  .readOnlyPicker .el-input__inner {
    background-color: @bgReadOnly;
  }

  .readOnlyPicker .el-input__suffix {
    visibility: hidden;
  }

  .el-input__inner:hover + .el-input__prefix {
    border-color: @hoverColor;
  }

  .el-input__inner:focus + .el-input__prefix {
    border-color: @inputFocusColor;
  }
}

.jat-date-picker-range {
  width: 236px;

  .el-range-separator {
    display: flex !important;
    align-items: center;
    width: auto;
    font-size: @fontSize;
    line-height: 12px;
    color: @placeholder;
  }

  .el-range-input {
    flex-shrink: 0;
    font-family: @fontFamily;
    font-size: @fontSize;
    line-height: @fontSize;
    color: @fontColor;
    background-color: transparent;
  }
}
</style>
<style lang="less">
@import url("../../commonCSS/variable-dark.less");

html[theme-color="dark"] {
  .jat-date-picker {
    .el-input__inner {
      color: #fff;
      background-color: @bgInputDark;
      border-color: transparent !important;

      &::-webkit-input-placeholder {
        color: @placeholderDark;
      }
    }

    .el-input--prefix {
      .el-input__prefix {
        background-image: linear-gradient(180deg, #4ca4ff 0%, #1f66e8 100%);
        border-color: transparent !important;
        border-radius: 0 4px 4px 0;

        &::after {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: url("./datePickerIconDark.png") no-repeat;
          background-position: center;
          content: "";
        }
      }
    }
  }

  .jat-daterange-popover__date.common-datePicker-popover {
    background-color: @bgInputDark;

    &.el-picker-panel {
      color: #fff;

      .el-picker-panel__icon-btn,
      .el-date-picker__header-label,
      .el-year-table td .cell,
      .el-month-table td .cell {
        &:hover {
          color: #1b77ff;
        }

        color: #fff;
      }

      .el-year-table td.disabled .cell,
      .el-month-table td.disabled .cell {
        color: #c0c4cc;
      }
    }
  }
}
</style>
