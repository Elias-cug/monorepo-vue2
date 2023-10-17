/* * 仅为下拉框，可以调节大小 medium small or mini, 默认mini *
多选功能如需要见board. * 继承方法：clearable, disabled, popoverClass,
placeholder... */
<template>
  <div
    class="jat-select"
    ref="JatSelect"
    :style="{ width: width }"
    :class="classSet()"
  >
    <el-select
      style="width: 100%"
      @change="handleChange"
      :size="size"
      :value="value"
      :validateEvent="validateEvent"
      :clearable="clearable"
      :tabindex="tabindex"
      :disabled="disabled"
      :readonly="readonly"
      :allow-create="allowcreate"
      :filterable="filterable"
      :value-key="valueKey"
      :default-first-option="defaultfirstoption"
      :nodata="nodata"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      @visible-change="handleVisibleChange"
      :popper-class="
        popperClass +
        ' ' +
        'jat-select-popover' +
        [popperAppendToBody ? '' : ' ']
      "
      :popper-append-to-body="popperAppendToBody"
      v-model="input"
      :placeholder="placeholder"
    >
      <slot></slot>
    </el-select>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "jat-select",
  props: {
    valueKey: String,
    /**
     * @description Select 下拉框的类名
     */
    popperClass: {
      type: String,
      default: ""
    },
    /**
     * @description 是否将弹出框插入至 body 元素。
     * 在弹出框的定位出现问题时，可将该属性设置为 false
     */
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    /** @description 	输入框尺寸 */
    size: {
      type: String,
      default: "mini",
      validator(value) {
        return ["medium", "small", "mini"].includes(value)
      }
    },
    readonly: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [String, Number],
      default: "请选择"
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: Boolean,
    collapseTags: Boolean,
    tabindex: String,
    value: [String, Number, Array, Object],
    width: String,
    nodata: {
      type: Boolean,
      default: false
    },
    allowcreate: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    defaultfirstoption: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      input: ""
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.input = newValue
      }
    }
  },
  model: {
    event: "input",
    prop: "value"
  },
  components: {},
  created() {
    this.input = this.value
  },
  mounted() {},
  methods: {
    classSet() {
      if (this.nodata) return "nodata"
    },
    handleChange(item) {
      this.$emit("change", item)
    },
    handleInput(item) {
      this.$emit("input", item)
    },
    handleFocus(item) {
      this.$emit("focus", item)
    },
    handleBlur(item) {
      this.$emit("blur", item)
    },
    handleVisibleChange(item) {
      this.$emit("visible-change", item)
    }
  }
}
</script>

<style lang="less">
@import url("../../commonCSS/varibles");

.jat-select {
  display: inline-block;
}

.jat-select .el-select {
  &:hover {
    .el-input__inner {
      border-color: @hoverColor;
    }

    .el-input__suffix {
      border-color: @hoverColor;
    }
  }

  &:focus {
    .el-input__inner {
      border-color: @inputFocusColor;
    }
  }

  .el-input {
    display: flex;
  }

  .el-input__inner {
    height: 30px;
    padding: 0 12px;
    padding-right: 30px;
    font-size: @fontSize;
    line-height: 30px;
    color: @fontColor;
    background-color: @bgInput;
    border-color: @borderColor;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;

    &::-webkit-input-placeholder {
      color: @placeholder;
    }

    &:hover {
      border-color: @hoverColor;
    }

    &:focus {
      border-color: @inputFocusColor;
    }
  }

  .el-input.is-focus .el-input__suffix {
    border-color: @inputFocusColor;
  }

  .el-input--medium .el-input__inner {
    height: 28px;
    padding: 0 12px;
    padding-right: 22px;
    line-height: 28px;
  }

  .el-input--medium .el-input__icon {
    width: 30px;
    line-height: 28px;
  }

  .el-input--small .el-input__inner {
    padding: 0 12px;
    padding-right: 30px;
  }

  .el-input--small .el-input__icon {
    width: 30px;
    line-height: 30px;
  }

  .el-input--mini .el-input__inner {
    padding: 0 10px;
    padding-right: 30px;
  }

  .el-input--mini .el-input__icon {
    width: 16px;
    line-height: 30px;
  }

  .el-input__suffix {
    right: 0;
    width: 30px;
    line-height: 30px;
    border-left: 1px solid #d5d5d5;
  }

  .el-icon-arrow-up::before {
    font-weight: bold;
    color: @fontColor;
  }
  // 以下为多选时的，tags
  .el-tag--mini {
    height: 18px;
    padding: 0 6px;
    line-height: 16px;
  }

  .el-tag {
    font-family: @fontFamily;
    font-size: @fontSize;
    border-radius: 10px;
  }

  .el-tag.el-tag--info {
    max-width: 65%;
    color: @fontColor;
    background-color: rgb(153 170 199 / 10%);
    border-color: rgb(216 216 216 / 10%);
  }

  .el-tag.el-tag--info .el-tag__close {
    color: #222841;
  }

  .el-tag__close.el-icon-close {
    right: -5px;
    font-weight: 600;
    color: #222841;
    background-color: rgb(153 170 199 / 80%);

    &:hover {
      color: @fontColor;
      background-color: @hoverColor;
    }
  }

  .el-input .el-select__caret {
    font-size: @fontSize;
  }
}

.el-select .el-select__tags > span {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.jat-select .el-input.is-disabled .el-input__inner {
  color: @disabled;
  cursor: not-allowed;
  background-color: @bgReadOnly;
  border-color: @borderColor;

  &:hover {
    border-color: @borderColor;
  }

  &::-webkit-input-placeholder {
    color: @disabled;
  }
}

/* 校验情况 */
.el-form-item.is-error .jat-select .el-input__inner,
.el-form-item.is-error .jat-select .el-input__inner:focus,
.el-form-item.is-error .jat-select .el-textarea__inner,
.el-form-item.is-error .jat-select .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
  // color: @error;
  // border-color: @error;

  &:hover {
    border-color: @errorHover;
  }
}

.jat-select-popover {
  background: @bgInput;
  border-radius: 4px;
  opacity: 0.98;

  .popper__arrow {
    display: none;
  }

  .el-select-dropdown__item {
    height: 30px;
    padding: 0 12px;
    font-family: @fontFamily;
    font-size: @fontSize;
    line-height: 30px;
    color: @fontColor;
  }

  .el-select-dropdown__item:hover,
  .el-select-dropdown__item.hover {
    color: @fontColor;
    background-color: @hoverColor;
  }

  .el-select-dropdown__item.selected {
    color: @fontColor;
    background-color: @hoverColor;
  }

  .el-select-dropdown__wrap {
    overflow-x: scroll !important;
    overflow-y: scroll !important;
    // margin-bottom: 0!important; // 这是个万不得已的样式修改，overflow-x不等于hidden的时候会出问题
  }
}

.jat-select-popover.is-multiple .el-select-dropdown__item.selected {
  color: @fontColor;
  background-color: @hoverColor;
}

.jat-select-popover.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: rgb(48 122 252 / 80%);
}

.jat-select-popover[x-placement^="bottom"] {
  margin-top: 4px;
}

.jat-select-popover[x-placement^="top"] {
  margin-bottom: 4px;
}

.offsetLeft0 {
  left: 0 !important;
}
// .nodata{
//   .el-input__inner{
//     border: 1px solid red!important;
//   }
// }
</style>
<style lang="less">
@import url("../../commonCSS/variable-dark.less");

html[theme-color="dark"] {
  .jat-select {
    &:hover {
      .el-input__suffix {
        border-color: transparent;
      }
    }

    .el-input .el-input__inner {
      color: #fff;
      background-color: @bgInputDark;
      border-color: transparent;

      &::-webkit-input-placeholder {
        color: @placeholderDark;
      }
    }

    .el-input__suffix,
    .el-input.is-focus .el-input__suffix {
      border-color: transparent;
    }

    .el-input__suffix {
      background-image: linear-gradient(180deg, #4ca4ff 0%, #1f66e8 100%);
      border-radius: 0 4px 4px 0;

      .el-icon-arrow-up::before {
        font-weight: bold;
        color: #fff;
      }
    }
  }

  .jat-select-popover {
    background-color: #002444;

    .el-select-dropdown__item {
      color: #fff;
    }
  }
}
</style>
