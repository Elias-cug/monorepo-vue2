<template>
  <div class="w-full h-full p-16px flex justify-center">
    <div class="w-full flex flex-col">
      <FilterLayout>
        <div class="w-full flex flex-wrap">
          <div class="mr-30px">
            <jat-input
              placeholder="数据对象名称"
              v-model.trim="filters.sjdxmc"
              class="w-240px mr-20px"
              :maxlength="40"
            />
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
          :pageSize="page_size"
          :currentPage="page_index"
          :isTableAbsolute="true"
          :loading="loading"
          operateWidth="200px"
          @current-page-change="onCurrentChange"
          @size-page-change="onSizeChange"
        >
          <div class="flex justify-end h-52px">
            <div class="flex h-full items-center">
              <OperateContainer :operates="topOperates" />
            </div>
          </div>
          <template slot="zt" slot-scope="scope">
            <div @click="onSwitch(scope.row)">
              <el-switch
                :value="scope.row.zt"
                :active-value="statusMap.启用"
                :inactive-value="statusMap.禁用"
              />
            </div>
          </template>
        </BasicTable>
      </div>
    </div>

    <DialogDataObject
      :tableList="tableList"
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
import {
  getOverviewStatistics,
  addOrUpdateSjdx,
  queryTableList,
  delSjdx
} from "@/api/sjdxpz"
import { getDate } from "@/utils/tools"
import { Message } from "element-ui"
import { columns } from "./components/columns"
import DialogDataObject from "./components/DialogDataObject.vue"
const defaultFilters = {
  sjdxmc: ""
}
export default {
  name: "ObjectConfig",
  components: {
    FilterLayout,
    BasicTable,
    OperateContainer,
    DialogDataObject
  },
  data() {
    return {
      statusMap: { 启用: "1", 禁用: "0" },
      columns,
      PickerOptions: {
        // 开始时间 时间选择器配置
        disabledDate: (date) => date > new Date()
      },
      data: [],
      total: 0,
      page_size: 10,
      page_index: 1,
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
      loading: false,
      tableList: []
    }
  },
  computed: {
    topOperates: function () {
      return [
        {
          key: "add",
          name: "新增",
          iconName: "icon-icon-add",
          action: this.onAdd
        }
      ]
    }
  },
  methods: {
    async queryTableList() {
      let res = await queryTableList()
      this.tableList = res.data.data
    },
    onSearch() {
      this.page_index = 1
      this.getData()
    },
    onReset() {
      this.filters = { ...defaultFilters }
      this.getData()
    },
    onOperate(item, data) {
      this.curOperateRow = data
      const action = {
        edit: () => {
          this.dialogType = "edit"
          this.showBusiness = true
        },
        delete: () => {
          this.$confirm(`是否确认删除该数据对象配置?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.delSjdx(data)
          })
        }
      }
      action[item.key]()
    },
    async delSjdx(item) {
      const { data } = await delSjdx({
        fbj: item.fbj
      })
      if (data) {
        Message({
          message: "删除成功",
          type: "success",
          duration: 2000
        })
        this.getData()
      }
    },
    getParam(par) {
      return {
        ...this.filters,
        page_size: this.page_size,
        page_index: this.page_index,
        ...(par || {})
      }
    },
    onCurrentChange(curIndex) {
      this.page_index = curIndex
      this.getData()
    },
    onSizeChange(curSize) {
      this.page_index = 1
      this.page_size = curSize
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
      let params = {
        dxmc: this.filters.sjdxmc,
        pageNum: this.page_index,
        pageSize: this.page_size
      }
      const res = await getOverviewStatistics(params)
      const { data, total } = res.data.data
      this.data = data.map((item) => {
        item.cjsj = getDate(item.cjsj.time)
        item.zdvalue = item.zd
          ? JSON.parse(item.zd)
              .map((item) => item.zdmc)
              .join(",")
          : ""
        return item
      })
      this.total = total
    },
    onSwitch(row) {
      const zt = row.zt
      if (zt === this.statusMap.启用) {
        this.$confirm(`是否确认禁用该数据对象配置?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.addOrUpdateSjdx(row, "0")
        })
      } else {
        this.addOrUpdateSjdx(row, "1")
      }
    },
    async addOrUpdateSjdx(item, zt) {
      let params = {
        ...item,
        zt
      }
      const { data } = await addOrUpdateSjdx(params)
      if (data) {
        Message({
          message: zt === "0" ? "禁用成功" : "启用成功",
          type: "success",
          duration: 2000
        })
        this.getData()
      }
    }
  },
  mounted() {
    // initYwdxTable()
    this.getData()
    this.queryTableList()
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
