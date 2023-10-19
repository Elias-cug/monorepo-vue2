<!-- 条件筛选弹窗 -->
<template>
  <el-dialog
    title="筛选"
    :visible.sync="dialogShow"
    :modal="false"
    :close-on-click-modal="false"
    @open="openDialogByCondition"
    :before-close="dataTableConditionFilterClose"
    append-to-body
    width="1200px"
    class="CkDialog"
  >
    <div class="analysis-cs-content">
      <el-main class="result-area commonConditionFilterMain">
        <el-row class="statistics-dimension-quota">
          <div class="filterBox">
            <div class="module-body">
              <commonConditionFilter
                v-if="dialogShow"
                ref="commonConditionFilter"
                :originFilterList="originFilterList"
                :columsData="columsData"
                @confirmSubmitCondition="confirmSubmitCondition"
                @CloseCommonFilter="CloseCommonFilter"
              >
              </commonConditionFilter>
            </div>
          </div>
        </el-row>
      </el-main>
    </div>
  </el-dialog>
</template>
<script>
import commonConditionFilter from "./CommonConditionFilter.vue"
export default {
  name: "DataTableConditionFilterBox",
  props: {
    /**
     * @description 筛选弹窗是否可见
     */
    dataTableConditionFilterVisible: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表格列数据
     */
    columsData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    /**
     * @description 父组件传入筛选条件，例如上次筛选条件等等
     */
    originFilterList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  components: {
    commonConditionFilter
  },
  data() {
    return {
      dialogShow: false
    }
  },
  watch: {
    dataTableConditionFilterVisible(newVal) {
      this.dialogShow = newVal
    }
  },
  methods: {
    /**
     * @description 筛选弹窗打开
     */
    openDialogByCondition() {},
    /**
     * @description 筛选弹窗关闭
     */
    dataTableConditionFilterClose() {
      this.$emit("dataTableConditionFilterClose")
    },
    /**
     * @description 确定筛选条件
     */
    confirmSubmitCondition(filterList) {
      this.$emit("confirmSubmitCondition", filterList)
    },
    CloseCommonFilter() {
      this.$emit("CloseCommonFilter")
    }
  }
}
</script>
