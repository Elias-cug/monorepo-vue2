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
            <jat-select
              class="w-240px"
              placeholder="请输入"
              v-model="filters.bdjg"
              filterable
            >
              <el-option
                v-for="o in bdjgList"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              />
            </jat-select>
          </div>
          <div class="flex flex-1 justify-end">
            <jat-button class="mr-20px" @click="onSearch">查询</jat-button>
            <jat-button type="info" @click="onReset">重置</jat-button>
          </div>
        </div>
      </FilterLayout>

      <div class="task-table-wrap flex-1 mt-16px p-20px bg-white">
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
          operateWidth="100px"
          @current-page-change="onCurrentChange"
          @size-page-change="onSizeChange"
        >
        </BasicTable>
      </div>
    </div>
  </div>
</template>
<script>
import { FilterLayout, BasicTable } from "@jat-comps/components"
import { columns } from "./components/columns"
import { getCompareResultApi } from "@/api/dataCompare"
import { bdjgList } from "./components/mock"
const defaultFilters = {
  rwmc: "",
  bdjg: ""
}
export default {
  name: "CompareResult",
  components: {
    FilterLayout,
    BasicTable
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
      loading: false,
      bdjgList
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
    onOperate(item, data) {
      this.curOperateRow = data
      const action = {
        detail: () => {
          this.curOperateRow = data
          this.$router.push({
            path: "/jat-sjpzbd/pzbdxq",
            query: { fbj: data.fbj, type: data.bdsjlx, name: data.rwmc }
          })
        }
      }
      action[item.key]()
    },
    getParam(par) {
      return {
        ...this.filters,
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
      const { data } = await getCompareResultApi(param)
      console.log(data)
      if (data) {
        this.data = data?.data?.data || []
        this.total = data?.data?.total
      }
    },
    operates(scope) {
      let operates = []
      if (scope.row.bdzt === "1") {
        return []
      }
      operates = [
        {
          key: "detail",
          title: "详情",
          action: this.onOperate
        }
      ]
      return operates
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
