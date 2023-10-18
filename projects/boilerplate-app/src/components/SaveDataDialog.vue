<!-- 保存数据弹窗 -->
<template>
  <el-dialog
    v-loading="diaLoading"
    :element-loading-text="loadingTxt"
    :title="diaType === 'save' ? '保存分析结果' : '数据导出'"
    :visible.sync="dialogShow"
    :modal="false"
    :close-on-click-modal="false"
    @close="closeSaveDialog"
    @open="openSaveDialog"
    append-to-body
    width="480px"
    class="CkDialog"
  >
    <div class="saveDialogForm">
      <el-form ref="saveForm" :modal="saveDataForm" :rules="rules">
        <el-form-item prop="" label="名称" required>
          <jat-input
            :maxlength="80"
            width="100%"
            v-model="saveDataForm.mc"
            placeholder="请输入分析结果名称"
          ></jat-input>
          <!-- <el-checkbox
            label="添加数据表名"
            v-model="tableFlag"
            @change="nameByTable"
          ></el-checkbox> -->
          <el-checkbox
            label="添加当前时间"
            v-model="dateFlag"
            @change="nameByDate"
          ></el-checkbox>
        </el-form-item>
        <!-- <template v-if="diaType === 'export'">
          <el-form-item prop="" label="文件格式" required>
            <el-radio-group style="width: 100%" v-model="wjgs">
              <el-radio label="xlsx">xlsx</el-radio>
              <el-radio label="csv">csv</el-radio>
              <el-radio label="txt">txt</el-radio>
            </el-radio-group>
          </el-form-item>
        </template> -->
        <!-- <el-form-item
          prop=""
          :label="
            diaType == 'save'
              ? '数据范围(最大限制' + parseInt(limitNumber) + '条)'
              : '数据范围(共' + total + '条)'
          "
          required
        >
          <jat-input
            width="100%"
            type="number"
            v-model="saveDataForm.sjfw"
            :max="Math.min(parseInt(limitNumber), parseInt(total))"
            placeholder="请输入数据范围"
            :append="true"
          >
            <span class="appendSpan" slot="appendSpan">条</span>
          </jat-input>
          <div v-if="disabledSaveBtn" class="color-#FF8000 h-18px lh-18px">
            最大限制保存{{ parseInt(limitNumber) }}条。
          </div>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="w-100% text-align-right">
      <jat-button
        size="small"
        @click="closeSaveDialog"
        class="mr-15px"
        type="info"
        >取消</jat-button
      >
      <jat-button
        size="small"
        :disabled="disabledSaveBtn"
        @click="saveDataComfirm"
        >{{ diaType !== "export" ? "保存" : "导出" }}</jat-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { downLoadFileApi } from "@/api/dataCompare"
import { mapGetters } from "vuex"
import { downloadMultipart } from "@jat-comps/utils"
import dayjs from "dayjs"
export default {
  name: "SaveDataDialog",
  props: {
    SaveDataDialogShow: {
      type: Boolean,
      default: false
    },
    /**
     * @description 筛选条件
     */
    filterList: {
      type: Array,
      default: () => []
    },
    /**
     * @description 表头
     */
    tableHeaders: {
      type: Array,
      default: () => []
    },
    /**
     * @description 表格排序
     */
    field_sort: {
      type: String,
      default: ""
    },
    /**
     * @description 表相关信息 包括 bid等
     */
    tableInfo: {
      type: Object,
      default: () => {}
    },
    /**
     * @description 总条数
     */
    total: {
      type: [String, Number],
      default: 0
    },
    /**
     * @description 当前弹窗类型 save：保存  export：导出
     */
    diaType: {
      type: String,
      default: "save"
    },
    /**
     * @description 类别，区分数据表等 (0:数据表,1:多维统计,2:单一模型,3:画布-结论)
     */
    lb: {
      type: [String, Number],
      default: "0"
    },
    id: {
      type: String,
      default: "13"
    }
  },
  data() {
    return {
      dialogShow: false,
      saveDataForm: {
        mc: "",
        sjfw: 100
      },
      limitNumber: 100, // 保存时 最大条数限制
      rules: {
        mc: [
          {
            required: true,
            message: "请输入分析结果名称"
          }
        ]
      },
      wjgs: "xlsx",
      tableFlag: true,
      dateFlag: true,
      exportTimeStamp: "",
      diaLoading: false,
      loadingTxt: ""
    }
  },
  watch: {
    SaveDataDialogShow(newVal) {
      this.dialogShow = newVal
    }
  },
  computed: {
    ...mapGetters({
      taskDetail: "task/taskDetail"
    }),
    /**
     * @description 超出保存最大条数限制--不能保存
     */
    disabledSaveBtn() {
      return this.saveDataForm.sjfw > parseInt(this.limitNumber)
    }
  },
  methods: {
    closeSaveDialog() {
      this.$refs.saveForm.clearValidate(["mc"])
      this.$emit("closeSaveDialog")
    },
    openSaveDialog() {
      this.tableFlag = true
      this.dateFlag = true
      this.wjgs = "xlsx"
      this.saveDataForm.sjfw = Math.min(100, parseInt(this.total))
      this.getTimeStamp()
      this.saveDataForm.mc = "比对结果" + "_" + this.exportTimeStamp
    },
    /**
     *@description  添加、去除数据表名
     */
    nameByTable() {
      this.saveDataForm.mc = "比对结果"
    },
    /**
     * @description 添加、去除时间戳
     */
    nameByDate() {
      if (this.dateFlag) {
        this.getTimeStamp()
        if (this.saveDataForm.mc === "") {
          this.saveDataForm.mc = this.exportTimeStamp
        } else {
          this.saveDataForm.mc =
            this.saveDataForm.mc + "_" + this.exportTimeStamp
        }
      } else {
        if (this.saveDataForm.mc.indexOf("_") !== -1) {
          this.saveDataForm.mc = this.saveDataForm.mc.replace(
            "_" + this.exportTimeStamp,
            ""
          )
        } else {
          this.saveDataForm.mc = this.saveDataForm.mc.replace(
            this.exportTimeStamp,
            ""
          )
        }
      }
    },
    // 获取时间戳
    getTimeStamp() {
      this.exportTimeStamp = new Date()
      this.exportTimeStamp = dayjs(this.exportTimeStamp).format(
        "YYYYMMDDhhmmss"
      )
    },
    /**
     * @description 保存弹窗确定
     */
    saveDataComfirm() {
      if (!this.saveDataForm.mc) {
        this.$message.info("请输入分析结果名称")
        return
      }
      if (!/^\+?[0-9]\d*$/.test(this.saveDataForm.sjfw)) {
        this.$message.info("数据范围应为正整数")
        return
      }
      if (this.saveDataForm.sjfw > this.total) {
        this.$message.info("最大输入限制" + this.total + "条")
        return
      }
      if (this.diaType === "save") {
        this.saveFn()
      } else {
        this.exportFn()
      }
    },
    /**
     * @description 导出接口
     */
    async exportFn() {
      const res = await downLoadFileApi({
        bdrzid: this.id,
        sxzd: JSON.stringify(this.filterList)
      })
      downloadMultipart(res, this.saveDataForm.mc + ".xlsx")
      this.$emit("closeSaveDialog")
    }
  }
}
</script>
<style lang="less">
.saveDialogForm {
  .el-form-item__label {
    line-height: 24px;
  }
}
</style>
