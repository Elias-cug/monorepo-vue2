<template>
  <div>
    <el-dialog
      class="CkDialog"
      :title="TITLE[dialogType]"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="480px"
    >
      <div class="w-full">
        <el-form
          class="c-form flex flex-col"
          ref="formRef"
          :model="baseModel"
          :rules="baseRules"
          label-position="top"
        >
          <el-form-item label="任务名称" prop="rwmc">
            <el-input
              placeholder="请输入"
              v-model="baseModel.rwmc"
              :maxLength="40"
              size="small"
            />
          </el-form-item>
          <el-form-item label="比对文件1" prop="bdwjmcOri">
            <div class="w-full flex">
              <div class="flex-1 mr-10px">
                <el-input
                  size="small"
                  v-model="baseModel.bdwjmcOri"
                  :disabled="true"
                />
              </div>
              <el-upload
                class="w-80px"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="onChangeForBdwja"
              >
                <jat-button :loading="loadingA">{{
                  baseModel.bdwjmcOri ? "重新上传" : "上传文件"
                }}</jat-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="比对文件2" prop="bdwjmcCur">
            <div class="w-full flex">
              <div class="flex-1 mr-10px">
                <el-input
                  size="small"
                  v-model="baseModel.bdwjmcCur"
                  :disabled="true"
                />
              </div>
              <el-upload
                class="w-80px"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="onChangeForBdwjb"
              >
                <jat-button :loading="loadingB">{{
                  baseModel.bdwjmcCur ? "重新上传" : "上传文件"
                }}</jat-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="比对时间" prop="bdsj">
            <jat-date-picker
              width="100%"
              v-model="baseModel.bdsj"
              type="datetime"
              :value-format="'yyyy-MM-dd HH:mm:ss'"
              clearable
            >
            </jat-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <jat-button type="info" @click="onCancel"> 取消 </jat-button>
        <jat-button class="ml-20px" @click="onConfirm">确定</jat-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addTaskApi, editTaskApi } from "@/api/dataCompare"
import { sjdxList, bdgzList } from "./mock"
import { verifyFileSize, verifyFileExt } from "@/views/DataCompare/share"
import { uploadFileApi } from "@/api/dataCompare"
const TITLE = {
  add: "新建任务",
  edit: "编辑任务"
}
const default_model = {
  rwmc: "",
  bdwjmcOri: "",
  bdwjbmOri: "",
  bdwjmcCur: "",
  bdwjbmCur: "",
  bdsj: ""
}
const default_rules = {
  rwmc: [{ required: true, message: "请填写任务名称", trigger: "blur" }],
  bdwjmcOri: [{ required: true, message: "请上传文件", trigger: "blur" }],
  bdwjmcCur: [{ required: true, message: "请上传文件", trigger: "blur" }]
}
export default {
  name: "DialogBusinessObject",
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    dialogType: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      baseModel: { ...default_model },
      baseRules: { ...default_rules },
      sjdxList,
      bdgzList,
      loadingA: false,
      loadingB: false,
      FileA: null,
      FileB: null
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.visible
      },
      set: function () {
        this.$emit("update:visible", false)
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        const action = {
          add: () => {
            this.baseModel = { ...default_model }
          },
          edit: () => {
            this.baseModel = {
              ...this.data
            }
          }
        }
        action[this.dialogType]()
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit("update:visible", false)
    },
    async onConfirm() {
      if (this.loadingA || this.loadingB) {
        this.$message.info("文件上传中，请稍后")
        return
      }
      await this.$refs.formRef.validate()
      if (this.dialogType === "add") {
        const { data } = await addTaskApi({ ...this.baseModel })
        if (data) {
          this.$message.success("新增成功")
          this.$emit("onConfirm")
          this.$emit("update:visible", false)
        }
      } else {
        const { data } = await editTaskApi({ ...this.baseModel })
        if (data) {
          this.$message.success("修改成功")
          this.$emit("onConfirm")
          this.$emit("update:visible", false)
        }
      }
    },
    async onChangeForBdwja(file) {
      if (!this.onBeforeUpload(file)) {
        return
      }
      this.loadingA = true
      let formData = new FormData()
      formData.append("file", file.raw)
      const { data } = await uploadFileApi(formData)
      if (data) {
        this.baseModel.bdwjmcOri = file.name
        this.baseModel.bdwjbmOri = data?.data
        this.$message.success("上传成功")
      }
      this.loadingA = false
    },
    async onChangeForBdwjb(file) {
      if (!this.onBeforeUpload(file)) {
        return
      }
      this.loadingB = true
      let formData = new FormData()
      formData.append("file", file.raw)
      const { data } = await uploadFileApi(formData)
      if (data) {
        this.baseModel.bdwjmcCur = file.name
        this.baseModel.bdwjbmCur = data?.data
        this.$message.success("上传成功")
      }
      this.loadingB = false
    },
    onBeforeUpload(e) {
      const flgExt = verifyFileExt(e.name)
      if (!flgExt) {
        this.$message.warning("文件格式仅支持csv,xls,xlsx")
        return false
      }
      const flgSize = verifyFileSize(e.size)
      if (!flgSize) {
        this.$message.warning("文件不能超过10M")
        return false
      }
      return true
    }
  },
  created() {
    this.TITLE = TITLE
  },
  mounted() {}
}
</script>
<style lang="less">
.c-form {
  box-sizing: border-box;
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-form-item__label {
    padding: 0;
    margin-bottom: 4px;
    line-height: normal;
  }
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
