<template>
  <div class="w-full flex-col flex justify-center">
    <div>
      <div class="w-full flex flex-wrap mb--30px">
        <template>
          <div class="mr-30px mb-30px" v-for="f in fList" :key="f.zddm">
            <jat-input
              :placeholder="f.zdmc"
              v-model.trim="f.zdz"
              class="w-240px mr-20px"
              :maxlength="40"
            />
          </div>
        </template>

        <div class="flex flex-1 justify-end mb-30px">
          <jat-button class="mr-20px" @click="onSearch">查询</jat-button>
          <jat-button type="info" @click="onReset">重置</jat-button>
        </div>
      </div>
    </div>
    <div class="w-full flex-1 pt-0">
      <BasicTable
        class="h-full"
        :columns="columns"
        :data="data"
        :total="total"
        :pageSize="pageSize"
        :currentPage="pageNum"
        :isTableAbsolute="true"
        :loading="loading"
        operateWidth="160px"
        @current-page-change="onCurrentChange"
        @size-page-change="onSizeChange"
        @sort-change="onChangeSort"
      >
        <div class="flex justify-end h-52px">
          <div class="flex h-full items-center">
            <OperateContainer :operates="topOperates" />
          </div>
        </div>
      </BasicTable>
    </div>
    <!-- 导出弹窗 -->
    <SaveDataDialog
      :filterList="lastFList"
      :tableHeaders="tableHeaders"
      field_sort=""
      :SaveDataDialogShow="SaveDataDialogShow"
      @closeSaveDialog="closeSaveDialog"
      :total="data.length"
      diaType="export"
      :id="fbj"
    />
  </div>
</template>
<script>
import { BasicTable, OperateContainer } from "@jat-comps/components"
import { orderMap } from "@jat-comps/consts"
import { detailResultColumns } from "./columns"
import { cloneDeep } from "lodash"
import {
  getTableColumnApi,
  getResultByTaskApi,
  getBusinessObjectDetail,
  getTableDataSqlApi,
  getKSHModelApi
} from "@/api/dataCompare"
import { localStg } from "@jat-comps/utils"

const KSH_TYPE = {
  关系图: "0",
  实体图: "1"
}

export default {
  name: "CompareTask",
  components: {
    BasicTable,
    OperateContainer,
    SaveDataDialog: () => import("@/components/SaveDataDialog.vue")
  },
  data() {
    return {
      statusMap: { 启用: 0, 禁用: 1 },
      columns: detailResultColumns,
      PickerOptions: {
        // 开始时间 时间选择器配置
        disabledDate: (date) => date > new Date()
      },
      ajStatusList: [],
      fList: [],
      originFList: [],
      lastFList: [],
      sortInfo: "",
      tableObj: {},
      fbj: "",
      data: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      curOperateRow: null,
      showBusiness: false,
      dialogType: "add",
      loading: false,
      dataTableConditionFilterVisible: false,
      tableHeaders: [],
      modelList: [],
      /**
       * @description 保存弹窗
       */
      SaveDataDialogShow: false,
      type: ""
    }
  },
  computed: {
    isDisableEntity: function () {
      return this.total === 0
    },
    isDisableGxt: function () {
      return this.total === 0
    },
    topOperates: function () {
      return [
        {
          key: "select",
          name: "条件筛选",
          hidden: true,
          action: this.onSelect
        },
        {
          key: "entity",
          name: "实体展示",
          action: this.showEntity,
          disabled: this.isDisableEntity,
          hidden: this.tableObj?.kshfs === KSH_TYPE.关系图
        },
        {
          key: "gxt",
          name: "关系图",
          buildIn: "DropDownButton",
          trigger: "click",
          splitButton: true,
          disabled: this.isDisableGxt,
          hidden:
            this.tableObj?.kshfs === KSH_TYPE.实体图 ||
            this.modelList.length === 0,
          events: {
            click: this.showGxtMr,
            command: this.showGxt
          },
          dropDownList: this.modelList
        },
        {
          key: "export",
          name: "数据导出",
          action: this.onExport
        }
      ]
    }
  },
  methods: {
    onSearch() {
      this.pageNum = 1
      this.getTableData()
    },
    onReset() {
      this.pageNum = 1
      this.fList = cloneDeep(this.originFList)
      this.getTableData()
    },
    getParam(par) {
      return {
        page_size: this.page_size,
        page_index: this.page_index,
        ...(par || {})
      }
    },
    onSelect() {
      this.dataTableConditionFilterVisible = true
    },
    async showEntity() {
      const { data } = await this.getSql()
      if (data) {
        localStg.set(
          "st",
          JSON.stringify({ sql: data?.data, tableInfo: this.tableObj })
        )
        this.$router.push({ path: "/jat-sjpzbd/kshstt" })
      }
    },
    async getSql() {
      const fbj = this.$route.query.fbj
      const param = {
        bdrzid: fbj,
        sxzd: JSON.stringify(this.lastFList)
      }
      return await getTableDataSqlApi(param)
    },
    async showGxtMr() {
      await this.getGxtParam(null, true)
      this.$router.push({ path: "/jat-sjpzbd/kshgxt" })
    },
    async showGxt(val) {
      await this.getGxtParam(val, false)
      this.$router.push({ path: "/jat-sjpzbd/kshgxt" })
    },
    async getGxtParam(model, isMr = false) {
      const { data } = await this.getSql()
      if (data) {
        const modelInfo = isMr ? this.modelList[0] : model
        localStg.set(
          "gxt",
          JSON.stringify({
            sql: data?.data,
            modelInfo,
            tableInfo: this.tableObj
          })
        )
      }
    },
    showRelationship() {
      this.$router.push({ path: "/jat-sjpzbd/kshgxt" })
    },
    onExport() {
      this.SaveDataDialogShow = true
    },
    closeSaveDialog() {
      this.SaveDataDialogShow = false
    },
    dataTableConditionFilterClose() {
      this.dataTableConditionFilterVisible = false
    },
    confirmSubmitCondition() {
      this.dataTableConditionFilterVisible = false
    },
    CloseCommonFilter() {
      this.dataTableConditionFilterVisible = false
    },
    onCurrentChange(curIndex) {
      this.pageNum = curIndex
      this.getTableData()
    },
    onSizeChange(curSize) {
      this.pageNum = 1
      this.pageSize = curSize
      this.getTableData()
    },
    onChangeSort(sortObj) {
      this.pageNum = 1
      const { order, prop } = sortObj
      if (order) {
        this.sortInfo = `${prop} ${order}`
      } else {
        this.sortInfo = ""
      }
      this.getTableData({ order, prop })
    },
    async getTableInfo(dxbm) {
      const { data } = await getBusinessObjectDetail({ dxbm })
      if (data) {
        this.originFList = JSON.parse(data?.data.sxzd)
        this.tableObj = data?.data
        this.fList = JSON.parse(data?.data.sxzd)
      }
    },
    async getTableColumn(type) {
      const { data } = await getTableColumnApi({ bdm: type })
      if (data) {
        this.columns = data?.data.map((item) => {
          return {
            prop: item.zddm,
            label: item.zdmc,
            minWidth: item.bgkd || "200px",
            sortable: item.sfzcpx === "Y"
          }
        })
      }
    },
    async getTableData(info = {}) {
      this.loading = true
      const param = {
        bdrzid: this.fbj,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        prop: info.prop,
        order: orderMap[info.order] || undefined,
        sxzd: JSON.stringify(this.fList)
      }
      this.lastFList = cloneDeep(this.fList)
      const { data } = await getResultByTaskApi(param)
      if (data) {
        this.data = data?.data?.data || []
        this.total = data?.data.total || 0
      }
      this.loading = false
    },
    async getKSHModel() {
      const { data } = await getKSHModelApi({ bid: this.tableObj.bid })
      if (data) {
        const fData = cloneDeep(data.data || [])
        const index = fData.findIndex((item) => item.sfmr === "1")
        const mr = fData.find((item) => item.sfmr === "1")
        fData.splice(index, 1)
        fData.unshift({ ...mr })

        this.modelList = fData.map((d) => {
          return {
            ...d,
            name: d.sfmr !== "1" ? d.mbmc : `${d.mbmc}(默认)`,
            originName: d.mbmc
          }
        })
      }
    }
  },
  async mounted() {
    const type = this.$route.query.type
    const fbj = this.$route.query.fbj
    // const rwmc = this.$route.query.name
    this.type = type
    this.fbj = fbj
    await this.getTableInfo(this.type)
    await this.getKSHModel()
    await this.getTableColumn(this.type)
    await this.getTableData()
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
