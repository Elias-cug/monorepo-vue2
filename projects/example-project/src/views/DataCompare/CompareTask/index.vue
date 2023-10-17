<template>
  <div class="w-full h-full p-16px flex justify-center">
    <div class="w-full flex flex-col">
      <FilterLayout>
        <div class="w-full flex flex-wrap">
          <div class="mr-30px">
            <jat-input
              placeholder="任务名称"
              v-model.trim="filters.rwmc"
              class="w-240px mr-20px"
              :maxlength="40"
            />
            <jat-date-picker
              width="240px"
              v-model="filters.cjsj"
              type="daterange"
              range-separator="-"
              :value-format="'yyyy-MM-dd'"
              start-placeholder="开始创建时间"
              end-placeholder="结束创建时间"
              clearable
              :picker-options="PickerOptions"
            >
            </jat-date-picker>
          </div>
          <div class="flex flex-1 justify-end">
            <jat-button class="mr-20px" @click="onSearch">查询</jat-button>
            <jat-button type="info" @click="onReset">重置</jat-button>
          </div>
        </div>
      </FilterLayout>

      <div class="task-table-wrap flex-1 mt-16px p-20px pt-0 bg-white">
        <BasicTable
          class="h-full"
          :columns="columns"
          :data="data"
          :total="total"
          :operates="operates"
          :pageSize="pageSize"
          :currentPage="pageNum"
          :isTableAbsolute="true"
          :loading="loading"
          operateWidth="160px"
          @current-page-change="onCurrentChange"
          @size-page-change="onSizeChange"
        >
          <div class="flex justify-end h-52px">
            <div class="flex h-full items-center">
              <OperateContainer :operates="topOperates" />
            </div>
          </div>
        </BasicTable>
      </div>
    </div>

    <DialogCompareConfig
      :visible.sync="showBusiness"
      :dialogType="dialogType"
      :data="curOperateRow"
      @onConfirm="onConfirm"
    />
  </div>
</template>
<script>
import {
  FilterLayout,
  BasicTable,
  OperateContainer
} from "@jat-comps/components"
import { Message } from "element-ui"
import { columns } from "./components/columns"
import DialogCompareConfig from "./components/DialogCompareConfig.vue"
import { getCompareTaskApi, deleteTaskApi } from "@/api/dataCompare"
const defaultFilters = {
  rwmc: "",
  cjsj: []
}
export default {
  name: "CompareTask",
  components: {
    FilterLayout,
    BasicTable,
    OperateContainer,
    DialogCompareConfig
  },
  data() {
    return {
      statusMap: { 启用: 0, 禁用: 1 },
      columns,
      PickerOptions: {
        // 开始时间 时间选择器配置
        disabledDate: (date) => date > new Date()
      },
      data: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      curOperateRow: null,
      showBusiness: false,
      dialogType: "add",
      filters: { ...defaultFilters },
      operates: [
        {
          key: "edit",
          title: "编辑",
          action: this.onOperate
        },
        {
          key: "delete",
          title: "删除",
          action: this.onOperate,
          style: { color: "#FF6600" }
        }
      ],
      loading: false
    }
  },
  computed: {
    topOperates: function () {
      return [
        {
          key: "add",
          name: "新建",
          iconName: "icon-icon-add",
          iconType: "blue",
          action: this.onAdd
        }
      ]
    }
  },
  methods: {
    onSearch() {
      this.pageNum = 1
      this.getData()
    },
    onReset() {
      this.pageNum = 1
      this.filters = { ...defaultFilters }
      this.getData()
    },
    onOperate(item, row) {
      this.curOperateRow = row
      const action = {
        edit: () => {
          this.dialogType = "edit"
          this.showBusiness = true
        },
        delete: () => {
          this.$confirm(`是否确认删除该任务?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(async () => {
            const { data } = await deleteTaskApi({ fbj: row.fbj })
            if (data) {
              this.getData()
              Message({
                message: "删除成功",
                type: "success",
                duration: 3000
              })
            }
          })
        }
      }
      action[item.key]()
    },
    getParam(par) {
      const cjsjStart = this.filters.cjsj[0]
      const cjsjEnd = this.filters.cjsj[1]
      return {
        cjsjStart,
        cjsjEnd,
        rwmc: this.filters.rwmc,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...(par || {})
      }
    },
    onCurrentChange(curIndex) {
      this.pageNum = curIndex
      this.getData()
    },
    onSizeChange(curSize) {
      this.pageNum = 1
      this.pageSize = curSize
      this.getData()
    },
    onAdd() {
      this.dialogType = "add"
      this.showBusiness = true
    },
    onConfirm() {
      this.getData()
    },
    async getData() {
      const param = this.getParam()
      console.log("查询参数", param)
      const { data } = await getCompareTaskApi(param)
      console.log(data)
      if (data) {
        this.data = data?.data?.data || []
        this.total = data?.data?.total || 0
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped lang="less">
.task-table-wrap {
  box-shadow: 0px 0px 6px 0px rgba(228, 230, 238, 1);
  border-radius: 4px;
}
.table-desc {
  font-size: 14px;
  color: #ff8000;
  font-weight: 400;
}
.rw-tab {
  height: 30px;
  background: #dbdde8;
  div {
    width: 96px;
    padding: 0 16px;
    line-height: 30px;
    background-color: #fff;
  }
}
</style>
