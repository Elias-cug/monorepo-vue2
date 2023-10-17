<template>
  <div class="jat_virtualtable h-full">
    <vxe-table
      ref="virtualScroll"
      :border="border"
      :height="height"
      :loading="loading"
      :show-overflow="showOverflow"
      :show-header-overflow="showHeaderOverflow"
      :data="data"
      :header-cell-class-name="headerCellClassName"
      :show-header="showHeader"
      :mouse-config="mouseConfig"
      :row-config="rowConfig"
      :column-config="columnConfig"
      :checkbox-config="checkboxConfig"
      :sort-config="sortConfig"
      :stripe="stripe"
      :scroll-y="scrollY"
      :scroll-x="scrollX"
      :menu-config="menuConfig"
      :seq-config="seqConfig"
      @cell-menu="cellMenu"
      @sort-change="onSortChange"
      @checkbox-change="onSelectionChange"
      @checkbox-all="onSelectionAll"
    >
      <slot></slot>
    </vxe-table>
  </div>
</template>
<script>
export default {
  name: "jat-virtualtable",
  props: {
    data: Array,
    /**
     * @description 表格高度
     */
    height: {
      type: [Number, String],
      default: "100%"
    },

    /**
     * @description 是否超出 省略
     */
    showOverflow: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表头是否超出 省略
     */
    showHeaderOverflow: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表 行 配置--是否可以hover
     */
    rowHover: {
      type: Boolean,
      default: true
    },
    /**
     * @description 表 行 配置--行 key字段
     */
    keyField: {
      type: String,
      default: ""
    },
    /**
     * @description 表 行 配置--行 高
     */
    rowHeight: {
      type: Number,
      default: 43
    },
    /**
     * @description 表格 checkbox配置--是否默认勾选全部
     */
    checkAll: {
      type: Boolean,
      default: false
    },
    /**
     * @description  表格 checkbox配置--绑定选中属性--行数据必须存在当前属性
     */
    checkField: {
      type: String,
      default: ""
    },
    /**
     * @description 是否允许勾选的方法
     */
    checkMethod: {
      type: Function,
      default: () => true
    },
    /**
     * @description 默认勾选指定行(只会在初始化触发一次)
     */
    checkRowKeys: {},
    /**
     * @description 是否使用服务端排序, true
     */
    isSortRemote: {
      type: Boolean,
      default: true
    },
    /**
     * @description 默认排序(只会在初始化触发一次)
     *  field: "",
        order: "" asc desc null
     */
    defaultSort: {
      type: Object,
      default: () => {}
    },
    /**
     * @description 数据改变是否滚动到顶部
     */
    scrollToTopOnChange: {
      type: Boolean,
      default: true
    },
    /**
     * @description 数据改变是否滚动到左侧
     */
    scrollToLeftOnChange: {
      type: Boolean,
      default: true
    },
    /**
     * @description 指定纵向虚拟滚动是否开启
     */
    virtualScrollY: {
      type: Boolean,
      default: false
    },
    /**
     * @description 指定纵向虚拟大于指定行开启虚拟滚动
     */
    virtualScrollGT: {
      type: Number
    },
    maxHeight: [Number, String],
    /**
     * 斑马纹
     */
    stripe: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: false
    },
    /**
     * @description
     * {
     *  selected: true  标识单元格可以选中
     * }
     */
    mouseConfig: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: "small"
    }, // small & mini, but only this
    /**
     * @description是否显示表头
     */
    showHeader: {
      type: Boolean,
      default: true
    },
    /**
     *  是否要高亮当前行
     */
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    /**
     *  是否要高亮当前列
     */
    highlightCurrentColumn: {
      type: Boolean,
      default: false
    },
    /**
     * @description 序号配置项
     */
    seqConfig: {
      type: Object,
      default: () => {}
    },
    /**
     * @description 右键菜单
     */
    menuOptions: {
      type: Map,
      default: () => new Map()
    },
    currentRowKey: [String, Number],
    rowClassName: [Object, String, Function],
    rowStyle: [Object, String, Function],
    cellClassName: [Object, String, Function],
    cellStyle: [Object, String, Function],
    headerRowClassName: [Object, String, Function],
    headerRowStyle: [Object, String, Function],
    headerCellClassName: [Object, String, Function],
    headerCellStyle: [Object, String, Function],
    rowKey: [Object, String, Function],
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandRowKeys: Array,
    showSummary: {
      type: Boolean,
      default: false
    }, // 是否在表尾显示合计行
    sumText: String,
    summaryMethod: [Object, Function],
    spanMethod: [Object, Function],
    selectOnIndeterminate: Boolean,
    indent: Number,
    lazy: Boolean,
    load: [Object, Function],
    treeProps: Object,
    tooltipEffect: {
      type: String, // dark/light
      default: "dark"
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * @description 排序改变
     */
    onSortChange(args) {
      this.$emit("sort-change", { ...args })
    },
    /**
     * @description  多选改变
     */
    onSelectionChange(data) {
      this.$emit("checkbox-change", data)
    },
    /**
     * @description 全选改变
     */
    onSelectionAll(data) {
      this.$emit("checkbox-all", data)
    },
    cellMenu(args) {
      this.$emit("cellMenu", { ...args })
    }
  },
  computed: {
    rowConfig() {
      return {
        isCurrent: this.highlightCurrentRow,
        isHover: this.rowHover,
        keyField: this.keyField,
        height: this.rowHeight
      }
    },
    columnConfig() {
      return {
        isCurrent: this.highlightCurrentColumn
      }
    },
    checkboxConfig() {
      return {
        checkAll: this.checkAll,
        checkField: this.checkField,
        checkRowKeys: this.checkRowKeys,
        checkMethod: this.checkMethod
      }
    },
    sortConfig() {
      return {
        remote: this.isSortRemote,
        defaultSort: this.defaultSort
      }
    },
    scrollY() {
      return {
        enabled: this.virtualScrollY,
        gt: this.virtualScrollGT,
        scrollToTopOnChange: this.scrollToTopOnChange
      }
    },
    scrollX() {
      return { scrollToLeftOnChange: this.scrollToLeftOnChange }
    },
    menuConfig() {
      return {
        body: { options: this.formatedMapOptions },
        trigger: "cell"
      }
    },
    formatedMapOptions() {
      // let options = []
      return this.menuOptions.keys()
    }
  },
  watch: {
    menuOptions(newVal) {
      newVal
      // console.log(newVal, "111111111111111111111")
    }
  }
}
</script>
<style lang="less">
.jat_virtualtable {
  .vxe-table--render-default .vxe-body--row.row--hover,
  .vxe-table--render-default .vxe-body--row.row--hover.row--stripe {
    font-weight: 500;
    color: #167cf3;
    background-color: #ebf3ff;
  }
}
</style>
