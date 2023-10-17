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
          <el-form-item label="数据对象名称：" prop="sjdxmc">
            <el-input
              placeholder="请输入"
              v-model="baseModel.sjdxmc"
              :maxLength="40"
              size="small"
            />
          </el-form-item>
          <el-form-item label="数据表" prop="sjb">
            <jat-select
              class="w-full"
              placeholder="请输入"
              v-model="baseModel.sjb"
              @change="changeSjb"
            >
              <el-option
                v-for="o in tableList"
                :key="o.bdm"
                :label="`${o.bdm}(${o.bmc})`"
                :value="o.bid"
              />
            </jat-select>
          </el-form-item>
          <el-form-item label="主键：" prop="zj">
            <jat-select
              style="display: flex !important"
              class="w-full h-40px flex-items-center"
              placeholder="请输入"
              multiple
              v-model="baseModel.zj"
            >
              <el-option
                v-for="o in fieldList"
                :key="o.zddm"
                :label="o.zdmc"
                :value="o.zddm"
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
import { queryColumnList, addOrUpdateSjdx } from "@/api/sjdxpz"
const TITLE = {
  add: "新增数据对象",
  edit: "编辑数据对象"
}
const default_model = {
  sjdxmc: "",
  sjb: "",
  zj: "",
  bz: ""
}
const default_rules = {
  sjdxmc: [{ required: true, message: "请填写数据对象名称", trigger: "blur" }],
  zj: [{ required: true, message: "请选择主键", trigger: "change" }]
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
    },
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      baseModel: { ...default_model },
      baseRules: { ...default_rules },
      fieldList: []
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
              sjdxmc: this.data.dxmc,
              sjb: this.tableList.find((item) => item.bdm === this.data.bdm)
                .bid,
              zj: this.data.zd
                ? JSON.parse(this.data.zd).map((item) => item.zddm)
                : [],
              bz: this.data.beiz
            }
            this.queryColumnList()
          }
        }
        action[this.dialogType]()
        this.$nextTick(() => {
          this.$refs.formRef.clearValidate()
        })
      } else {
        this.fieldList = []
        this.$refs.formRef.clearValidate()
      }
    },
    "baseModel.sjb": {
      handler(newVal) {
        if (newVal) {
          this.queryColumnList()
        }
      },
      immediate: true
    }
  },
  methods: {
    async queryColumnList() {
      let params = {
        bid: this.baseModel.sjb
      }
      let res = await queryColumnList(params)
      this.fieldList = res.data.data
    },
    onCancel() {
      this.$emit("update:visible", false)
    },
    async onConfirm() {
      await this.$refs.formRef.validate()
      let tableItem = this.tableList.find(
        (item) => item.bid === this.baseModel.sjb
      )
      let zd = this.baseModel.zj.map((item) => {
        return {
          zddm: item,
          zdmc: this.fieldList.find((i) => i.zddm === item).zdmc
        }
      })
      let params = {
        bdm: tableItem.bdm,
        bid: this.baseModel.sjb,
        bmc: tableItem.bmc,
        dxmc: this.baseModel.sjdxmc,
        zd: JSON.stringify(zd),
        beiz: this.baseModel.bz
      }
      let message = ""
      if (this.dialogType === "add") {
        message = "新增成功"
      } else {
        message = "修改成功"
        params.fbj = this.data.fbj
      }
      const { data } = await addOrUpdateSjdx(params)
      if (data) {
        Message({
          message,
          type: "success",
          duration: 2000
        })
        this.$emit("onConfirm")
        this.$emit("update:visible", false)
      }
    },
    changeSjb() {
      this.baseModel.zj = ""
      this.$nextTick(() => {
        this.$refs.formRef.clearValidate("zj")
      })
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
