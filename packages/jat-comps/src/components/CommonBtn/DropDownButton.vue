<template>
  <el-dropdown
    class="DropDownButton"
    :class="{ splitButtonDropDown: splitButton, disable__btn: disabled }"
    size="small"
    :split-button="splitButton"
    :trigger="trigger"
    :disabled="disabled"
    @click="clickDropDownSpliButton"
    @command="DropDownButtonCommand"
  >
    <template v-if="splitButton"> <slot></slot></template>
    <template v-else>
      <div class="dropDownTrigger">
        <slot></slot><i class="el-icon-arrow-down"></i>
      </div>
    </template>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in dropDownList"
        :key="item.name + index"
        :command="item"
      >
        <i v-if="item.icon" :class="item.icon"></i
        >{{ item.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: "DropDownButton",
  props: {
    name: {
      type: String,
      default: ""
    },
    splitButton: {
      type: Boolean,
      default: false
    },
    dropDownList: {
      type: Array,
      default: () => []
    },
    trigger: {
      type: String,
      default: "hover"
    },
    events: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickDropDownSpliButton() {
      this.events["click"] && this.events["click"](this.name)
    },
    DropDownButtonCommand(item) {
      this.events["command"] && this.events["command"](item, this.name)
    }
  }
}
</script>
<style lang="less" scoped>
.DropDownButton {
  .dropDownTrigger {
    cursor: pointer;
    padding: 0 16px;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    background-image: linear-gradient(
      180deg,
      #4097ff 0%,
      #2787ff 5%,
      #2860f3 98%
    );
    border-radius: 4px;
    &:hover {
      background-image: linear-gradient(
        180deg,
        #40d8ff 0%,
        #40c6ff 33%,
        #3e82ff 98%
      );
    }
  }

  &.splitButtonDropDown {
    /deep/ .el-button {
      font-size: 14px;
      color: #fff;
      background-image: linear-gradient(
        180deg,
        #4097ff 0%,
        #2787ff 5%,
        #2860f3 98%
      );
      height: 32px;
      padding-top: 8px;
      padding-bottom: 8px;
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
    }
    /deep/ .el-button-group > .el-button:first-child {
      &:hover {
        background-image: linear-gradient(
          180deg,
          #40d8ff 0%,
          #40c6ff 33%,
          #3e82ff 98%
        );
      }
    }
  }
  &.disable__btn {
    .dropDownTrigger {
      background-color: #ffffff;
      background-image: none;
      border-color: 1px solid #dcdfe6;
      &:hover {
        background-image: none;
        background-color: #ffffff;
        border-color: 1px solid #dcdfe6;
      }
    }

    &.splitButtonDropDown {
      /deep/ .el-button {
        color: #c0c4cc;
        background-color: #ffffff;
        background-image: none;
        border-color: 1px solid #dcdfe6;
      }
      /deep/ .el-button-group > .el-button:first-child {
        &:hover {
          background-color: #ffffff;
          background-image: none;
          border-color: 1px solid #dcdfe6;
        }
      }
    }
  }
}
</style>
