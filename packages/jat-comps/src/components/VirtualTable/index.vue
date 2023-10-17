<template>
  <div class="flex flex-col">
    <!-- 顶部操作，描述 -->
    <slot name="default" />
    <div class="flex-1 relative">
      <jat-virtualtable
        ref="basicTable"
        class="w-full h-full"
        :class="{ absolute: isTableAbsolute }"
        :data="data"
        headerCellClassName="jatVirtualtableHeader"
        :loading="loading"
        :virtualScrollY="true"
        :virtualScrollGT="50"
        :showOverflow="true"
        :showHeaderOverflow="true"
        :seqConfig="{
          seqMethod: this.seqMethod
        }"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <vxe-column
          v-if="selectType === 'single'"
          width="60px"
          label="选择"
          fixed="left"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="curRow"
              :label="scope.row[singleKey]"
              @change="onSingleSelectionChange(scope.row)"
            >
              {{ "" }}
            </el-radio>
          </template>
        </vxe-column>
        <vxe-column
          v-if="selectType === 'multi'"
          type="checkbox"
          fixed="left"
        />
        <vxe-column type="seq" title="序号" fixed="left" width="80px">
        </vxe-column>
        <vxe-column
          v-if="operates.length"
          title="操作"
          :width="operateWidth"
          fixed="left"
        >
          <template slot-scope="scope">
            <ListOperate :operates="operates" :curRow="scope.row" />
          </template>
        </vxe-column>
        <vxe-column
          v-for="c in columns"
          :key="c.id"
          :field="c.prop"
          :title="c.label"
          :width="c.width"
          :min-width="c.minWidth || ''"
          :visible="c.bgxs === '1'"
          :align="c.align || 'left'"
          :show-overflow-tooltip="c.showOverflowTooltip || false"
          :sortable="c.sortable"
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
                  : row[c.prop]
              }}
            </span>
          </template>
        </vxe-column>
      </jat-virtualtable>
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
  name: "VirtualTable",
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
      type: Array,
      default: () => []
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
    }
  },
  data() {
    return {
      curRow: ""
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
    /**
     *@description 处理序号
     */
    seqMethod({ rowIndex }) {
      if (this.hasPage) {
        // 存在分页
        return (
          (this.$attrs.currentPage - 1) * this.$attrs.pageSize + rowIndex + 1
        )
      } else {
        // 没有分页
        return rowIndex + 1
      }
    }
  }
}
</script>

<style lang="less">
.jatVirtualtableHeader {
  background: #ebeff4;
  font-weight: "600";
  color: #333333;
}
</style>
