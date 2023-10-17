<template>
  <div class="flex flex-col">
    <!-- 顶部操作，描述 -->
    <slot name="default" />
    <div class="flex-1 relative">
      <jat-table
        ref="basicTable"
        class="w-full h-full"
        :class="{ absolute: isTableAbsolute }"
        :data="data"
        :highlightCurrentRow="true"
        :headerCellStyle="{
          background: '#EBEFF4',
          fontWeight: '600',
          color: '#333333'
        }"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <el-table-column
          v-if="selectType === 'single'"
          width="60px"
          label="选择"
          fixed="left"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="curRow[singleKey]"
              :label="scope.row[singleKey]"
              @change="onSingleSelectionChange(scope.row)"
            >
              {{ "" }}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column
          v-if="selectType === 'multi'"
          type="selection"
          fixed="left"
        />
        <template v-if="hasPage">
          <el-table-column type="index" label="序号" fixed="left">
            <template slot-scope="scope">
              {{
                ($attrs.currentPage - 1) * $attrs.pageSize + (scope.$index + 1)
              }}
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column type="index" label="序号" fixed="left" />
        </template>
        <el-table-column
          v-if="operates"
          label="操作"
          :width="operateWidth"
          fixed="left"
        >
          <template slot-scope="scope">
            <div v-if="!showOperates(scope).length">——</div>
            <ListOperate
              v-else
              :operates="showOperates(scope)"
              :curRow="scope.row"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-for="c in columns"
          :key="c.id"
          :prop="c.prop"
          :label="c.label"
          :width="c.width"
          :min-width="c.minWidth || ''"
          :align="c.align || 'left'"
          :show-overflow-tooltip="
            c.showOverflowTooltip === false ? false : true
          "
          :sortable="c.sortable ? 'custom' : false"
          :formatter="
            (row, column, cellValue, index) => {
              return c.render
                ? c.render(row, column, cellValue, index)
                : cellValue
            }
          "
        >
          <template slot-scope="{ row, column, $index }">
            <slot v-if="c.renderName" :name="c.renderName" :row="row" />
            <span v-else>
              {{
                c.render
                  ? c.render(row, column, row[c.prop], $index)
                  : row[c.prop] || "--"
              }}
            </span>
          </template>
        </el-table-column>
      </jat-table>
    </div>

    <jat-pagination
      v-if="hasPage"
      style="margin-top: 10px"
      layout="sizes,total, ->,  prev, pager, next, jumper"
      :total="total"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import { ListOperate } from "@jat-comps/components"
export default {
  name: "TaskTable",
  components: {
    ListOperate
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    operates: {
      type: [Array, Function],
      default: null
    },
    selectType: {
      type: String,
      default: "none"
    },
    singleKey: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasPage: {
      default: true
    },
    isTableAbsolute: {
      default: false
    },
    operateWidth: {
      default: "200px"
    },
    selectedSingleRow: {
      type: Object
    }
  },
  data() {
    return {
      curRow: ""
    }
  },
  watch: {
    selectedSingleRow(val) {
      console.log(9090)
      console.log(val)
      this.curRow = val
    }
  },
  methods: {
    onCurrentChange(curPage) {
      this.$emit("current-page-change", curPage)
    },
    onSizeChange(curSize) {
      this.$emit("size-page-change", curSize)
    },
    onSelectionChange(selection) {
      this.$emit("selection-change", selection)
    },
    onSingleSelectionChange(selection) {
      if (selection) {
        this.curRow = selection[this.singleKey]
        this.$emit("single-selection-change", selection)
      }
    },
    showOperates: function (val) {
      if (Array.isArray(this.operates)) {
        return this.operates
      }
      return this.operates(val)
    }
  }
}
</script>

<style lang="less"></style>
