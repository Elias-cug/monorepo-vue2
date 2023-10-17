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
          <el-form-item label="方案名称：" prop="famc">
            <el-input
              placeholder="请输入"
              v-model="baseModel.famc"
              :maxLength="40"
              size="small"
            />
          </el-form-item>
          <el-form-item label="数据对象" prop="sjdx">
            <jat-select
              class="w-full"
              placeholder="请输入"
              v-model="baseModel.sjdx"
            >
              <el-option
                v-for="o in sjdxList"
                :key="o.dxmc"
                :label="o.dxmc"
                :value="o.dxmc"
              />
            </jat-select>
          </el-form-item>
          <el-form-item label="比对规则：" prop="bdgz">
            <jat-select
              class="w-full"
              placeholder="请输入"
              v-model="baseModel.bdgz"
            >
              <el-option
                v-for="o in bdgzList"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              />
            </jat-select>
          </el-form-item>
          <el-form-item label="备注：" prop="bz">
            <el-input
              v-model="baseModel.bz"
              type="textarea"
              :maxLength="200"
              :rows="3"
              size="small"
            />
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
import { Message } from "element-ui"
import { addOrUpdateSjdx, querySjdx } from "@/api/bdfa"
import { bdgzList } from "./mock"
const TITLE = {
  add: "新增方案",
  edit: "编辑方案"
}
const default_model = {
  famc: "",
  sjdx: "",
  bdgz: "",
  bz: ""
}
const default_rules = {
  famc: [{ required: true, message: "请填写方案名称", trigger: "blur" }],
  bdgz: [{ required: true, message: "请选择比对规则", trigger: "change" }],
  sjdx: [{ required: true, message: "请选择数据对象", trigger: "change" }]
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
      sjdxList: [],
      bdgzList
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
        this.querySjdx()
        this.$nextTick(() => {
          this.$refs.formRef.clearValidate()
        })
      } else {
        this.$refs.formRef.clearValidate()
      }
    }
  },
  methods: {
    async querySjdx() {
      let res = await querySjdx()
      this.sjdxList = res.data.data
    },
    onCancel() {
      this.$emit("update:visible", false)
    },
    async onConfirm() {
      await this.$refs.formRef.validate()
      let parmas = {
        famc: this.baseModel.famc,
        beiz: this.baseModel.bz,
        bdgz: this.baseModel.bdgz,
        sjdx: this.baseModel.sjdx
      }
      let message = ""
      if (this.dialogType === "add") {
        message = "新增成功"
      } else {
        message = "修改成功"
        parmas.fbj = this.data.fbj
      }
      const { data } = await addOrUpdateSjdx(parmas)
      if (data) {
        Message({
          message,
          type: "success",
          duration: 2000
        })
        this.$emit("onConfirm")
        this.$emit("update:visible", false)
      }
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
