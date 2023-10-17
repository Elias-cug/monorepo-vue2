<template>
  <div class="c-search-input">
    <el-input
      v-model="jatValue"
      :placeholder="placeholder"
      :size="size"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <span @click="handleChange" slot="append">
        <i class="el-icon-search"></i>
      </span>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "mini"
    }
  },
  data() {
    return {}
  },
  computed: {
    jatValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      }
    }
  },
  methods: {
    handleChange(item) {
      this.$emit("change", item)
    },
    handleFocus(item) {
      this.$emit("focus", item)
    },
    handleBlur(item) {
      this.$emit("blur", item)
    }
  }
}
</script>
<style lang="less">
.c-search-input {
  .el-input {
    .el-input__inner {
      transition: 0s;
      border-radius: 4px 0 0 4px;
    }
    .el-input-group__append {
      width: 32px;
      background: #ffffff;
      padding: 0;
      text-align: center;
      cursor: pointer;

      .el-icon-search {
        font-size: 16px;
        font-weight: 900;
        color: #333;
      }
    }
  }
  &:hover {
    .el-input__inner,
    .el-input-group__append {
      border-color: rgba(46, 126, 255, 0.36);
    }
  }
  .el-input__inner:focus + .el-input-group__append {
    border-color: rgba(45, 125, 255, 0.8);
    .el-icon-search {
      color: #167cf3;
    }
  }
}
</style>
