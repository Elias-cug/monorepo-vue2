<template>
  <div class="jat_table h-full">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="data"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      :size="size"
      :tooltip-effect="tooltipEffect"
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @header-click="handleHeaderClick"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change="handleCurrentChange"
      @expand-change="handleExpandChange"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "jat-table",
  props: {
    data: Array,
    height: {
      type: [Number, String],
      default: "100%"
    },
    maxHeight: [Number, String],
    stripe: Boolean, // 斑马纹
    loading: Boolean,
    border: {
      type: Boolean,
      default: false
    }, // 是否带有纵向边框
    size: {
      type: String,
      default: "small"
    }, // small & mini, but only this
    showHeader: {
      type: Boolean,
      default: true
    }, // 是否显示表头
    highlightCurrentRow: {
      type: Boolean,
      default: false
    }, // 是否要高亮当前行
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
    defaultSort: Object, // 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
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
  components: {},
  mounted() {},
  methods: {
    handleSelect(selection, row) {
      this.$emit("select", selection, row)
    },
    handleSelectAll(selection) {
      this.$emit("select-all", selection)
    },
    handleSelectionChange(selection) {
      this.$emit("selection-change", selection)
    },
    handleCellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event)
    },
    handleCellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event)
    },
    handleCellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event)
    },
    handleRowClick(row, column, event) {
      this.$emit("row-click", row, column, event)
    },
    handleRowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event)
    },
    handleHeaderClick(column, event) {
      this.$emit("header-click", column, event)
    },
    handleSortChange({ column, prop, order }) {
      this.$emit("sort-change", { column, prop, order })
    },
    handleFilterChange(filters) {
      this.$emit("filter-change", filters)
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("current-change", currentRow, oldCurrentRow)
    },
    handleExpandChange(row, data) {
      this.$emit("expand-change", row, data)
      // （展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
    }
  }
}
</script>

<style lang="less">
@import url("./table.less");
</style>
