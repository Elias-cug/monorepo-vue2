<template>
  <div class="w-full">
    <el-select
      ref="select"
      class="w-full"
      :value="value"
      popper-class="c-tree-select"
      size="small"
      :disabled="disabled"
      v-bind="selectProp"
      @visible-change="onVisibleChange"
    >
      <el-option
        class="tree-select_tree"
        :value="optionData.id"
        :label="optionData.name"
      >
        <el-tree
          class="w-full"
          ref="tree"
          :data="treeData"
          default-expand-all
          highlight-current
          :expand-on-click-node="true"
          @node-click="onNodeClick"
          v-bind="$attrs"
          v-on="$listeners"
        />
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SelectTree",
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    value: [String, Number],
    treeProp: {
      type: Object
    },
    selectProp: {
      type: Object
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      showLabel: "",
      optionData: {
        id: "",
        name: ""
      }
    }
  },
  computed: {},
  watch: {
    value: {
      handler(val) {
        if (Array.isArray(this.treeData) && this.treeData.length) {
          this.init(val)
        }
      },
      immediate: true
    }
  },
  methods: {
    onNodeClick(node) {
      this.$emit("input", node.flid)
      this.showLabel = node.flmc
      this.$refs.select.blur()
    },
    init(val) {
      val = val === "" ? null : val
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(val)
        if (val === null) {
          return
        }
        const node = this.$refs.tree.getNode(val)
        this.optionData.id = val
        this.optionData.name = node.label
      })
    },
    onVisibleChange(e) {
      if (e) {
        const tree = this.$refs.tree
        let selectDom = null
        selectDom = tree.$el.querySelector(".is-current")
        setTimeout(() => {
          this.$refs.select.scrollToOption({ $el: selectDom })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.c-tree-select {
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: white !important;
  }
  .el-select-dropdown__item {
    height: auto !important;
  }
  .tree-select_tree {
    padding: 4px 20px;
  }
}
</style>
